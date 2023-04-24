/**
 * Implementation of a Queue Data Structure.
 */
export class Queue {
  constructor(){
    this.list = [];
  }
  /**
   * Adds a new item to the queue.
   * @param item The item to be added at the end of the queue.
   */
  enqueue (item){
    this.list.push(item);
  }
  /**
   * Gets first item in the queue and removes it.
   * @return The first item in the queue.
   */
  dequeue (){
    return this.list.shift();
  }
  /**
   * Checks if the queue is empty.
   * @return True if it's empty, false otherwise.
   */
  isEmpty (){
    return this.list.length === 0;
  }
}