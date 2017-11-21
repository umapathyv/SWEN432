/*
*@desc: This code snippet is for displaying the distribution of the nodes in the Apache Cassandra distributed database cluster using 'SimpleStrategy'replication strategy given the names of nodes and the replication factor.
*For example, given an array of nodes ["A","B","C","D","E","F"] and replication factor n=8, the code snippet will generate the following distributed layout for replication from 2 to 8. 
*N=2 : AB,      BC,      CD,       DE,       EF,       FA,   // node A is replicated twice across the 8 partitions cluster 
*N=3 : ABC,     BCD ,    CDE,      DEF,      EFA,      FAB   // node A is replicated three times across the 8 partitions cluster
*N=4 : ABCD,    BCDE,    CEDF,     DEFA,     EFAB,     FABC
*N=5 : ABCDE,   BCDEF,   CDEFA,    DEFAB,    EFABC,    FABCD
*N=6 : ABCDEF,  BCDEFA,  CDEFAB,   DEFABC,   EFABCD,   FABCDE
*N=7 : ABCDEFA, BCDEFAB, CDEFABC,  DEFABCD,  EFABCDE,  FABCDEF 
*N=8 : ABCDEFAB,BCDEFABC,CDEFABCD, DEFABCDE, EFABCDEF, FABCDEFA   

*@run instruction: copy paste the code snippet into Chrome developer tools console (ctrl+shift+i) and hit enter to see the output. 

*@last modified : 21/11/2017

*@original version: https://github.com/AdrianNg/Data-Structures-and-Algorithms-with-JS/blob/72c4137c6adfa59cc8f7fe8e0f2092025f290b8e/array.js

*@author: https://github.com/AdrianNg/

*@motivation :The reason I chose this code snippet is that it is the recently coding I have done which involves a certain amount of debugging and thinking 
*and I believe it is a typical code sample which demonstrates the general overview of style and process when I try to solve a practical problem via coding.  
*It is related to one of my course http://ecs.victoria.ac.nz/Courses/SWEN432_2017T1/LectureSchedule and I used this code to assist me to tackle some previous exam questions for exam preparation in a programmatically approach 
*instead of hand drawing on the paper. Because I thought this process can be automated, so I implemented in it JS which has the most accessible debugging environment(browser) to me.

*/


class Cassandra  {
    /**
    * constructor to simulate a Cassandra cluster.
    * @param {array} nodes - The array of string for nodes' name. e.g. ["A","B","C","D","E","F"]
    * @param {number} replicationFactor - The replication factor of the cluster which means how many replicas copies of one node 
    */
    constructor(nodes,replicationFactor) {
        let _nodes = nodes; // private property
        this.nodesString = function (){  //  public getter
            return  _nodes.toString();
        }
        this.nodes = nodes;
        this.replicationFactor = replicationFactor;
    }
    
    /**
    * Get all layouts distribution.
    * @return {array} two dimensional array (distribution matrix) of nodes distribution from incremental replication Factors. 
    */
    get allReplicationLayouts() {
        let layouts = []; 
        for (let i=2; i <= this.replicationFactor; i++){  
            layouts.push(this.getPartitions(this.nodes,i));  //  add one row distribution for one replication Factors into the distribution matrix ,e.g. add ["ABC", "BCD", "CDE", "DEF", "EFA", "FAB"]
            console.log("distribution for replication Factor = " +i+":");
            console.log(this.getPartitions(this.nodes,i));
        }
        return layouts ;  
    }
    
    /**
    * Get all partitions for one replicationFactor.
    * @param {array} nodes - The array of string for nodes' name. e.g. ["A","B","C","D","E","F"]
    * @param {number} replicationFactor - The replication factor of the cluster which means how many copies of one node 
    * @return {array} array of nodes string. e.g. ["AB", "BC", "CD", "DE", "EF", "FA"]
    */
    getPartitions(nodes,replicationFactor){
        // construct one replication group according to the replicationFactor  e.g. ["E", "F", "A", "B", "C", "D"]
        let convolutionalSets = []; 
        for (let i=0; i<nodes.length; i++){
            convolutionalSets.push(this.getConvolutionalSet(nodes,i));
        };
        // format the convolutionalSets 
        let partitions = []; 
        for (let i=0; i<nodes.length; i++){
            partitions.push(this.getOnePartition(convolutionalSets[i],replicationFactor));
        };
        return partitions;
    }
    
    /**
    * Get one partition convolutional Set.
    * @param {array} nodes - The array of string for nodes' name. e.g. ["A","B","C","D","E","F","G","H","I","J","K","L"]
    * @param {number} cursor - the index of the moving starting node  
    * @return {array} array of nodes string. e.g.  ["A", "B", "C", "D", "E", "F", "G"]
    */
    getConvolutionalSet(nodes,cursor){
        let convolutionalSet = [];
            let startPointer = 0; // point to the first node in the partition 
            for (let i =0; i<nodes.length; i++){
                if (cursor<nodes.length)
                convolutionalSet[i] = nodes[cursor++];  // e.g. ["A", "B", "C", "D", "E", "F", "G"]
                else 
                convolutionalSet[i] = nodes[startPointer++]; // cursor is greater than node length so need to append from first node e.g. ["B", "C", "D", "E", "F", "G","A"]
            }
        return convolutionalSet; 
    }
    
    /**
    * Get one partition in a string format.
    * @param {array} nodes - The array of string for nodes' name. e.g. ["A","B","C","D","E","F"]
    * @param {number} replicationFactor - The replication factor of the cluster which means how many copies of one node 
    * @return {string} nodes string. e.g. ["AB", "BC", "CD", "DE", "EF", "FA"]
    */
    getOnePartition (nodes,replicationFactor){ 
        let partitionString ="";
        if (nodes.length>replicationFactor)  {  // the number of nodes is bigger than replication factor ,e.g ["A","B","C","D","E","F","G"].length > 8
            for (let i=0 ; i<replicationFactor; i++) // until the current partition length reach the replication factor , e.g  "ABCD" =4
                partitionString += nodes[i]; 
            return partitionString; 
        }
        // the number of nodes is smaller than replication factor ,e.g ["A","B","C","D","E","F","G"].length < 8
        let repeats = Math.floor(replicationFactor/nodes.length);  // number of repeated set in one partition.
        let remainder = replicationFactor%nodes.length; 
        // e.g  "ABCDEFABCDEFAB"
        for (let i=0; i<repeats; i++)
            partitionString += nodes.toString().replace(/,/g,'');  // form the first part "ABCDEFABCDEF"
        for (let i=0; i<remainder; i++)
            partitionString += nodes[i];   // apend the second part "ABCDEFABCDEF"+"AB"
    	return partitionString;
    }
}


// demo 
const cassandra = new Cassandra(["A","B","C","D","E","F"], 8);

cassandra.allReplicationLayouts;






















