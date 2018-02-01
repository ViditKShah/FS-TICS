// Define your models here 
// Sample User model
export class User {
    
    constructor(
        public _id: string,
        public name : String,
        public age: Number,
        public location : string,
        public blog: string
    ){} 

}