"use strict";
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
var uuid = require('node-uuid');

let exportedMethods = {
    getCurrentEvents() {
        const eventPath = path.resolve(__dirname, "event-files/", `eventlist.json`);
        return fs.statAsync(eventPath).then((stats) => {
          return fs.readFileAsync(eventPath, "utf-8");
        });
    },

    saveEvents(eventObj){
        return new Promise((fulfill, reject) => {
                    const eventPath = path.resolve(__dirname, "event-files/", `eventlist.json`);
                    fs.writeFile(eventPath, JSON.stringify(eventObj, null, 4), (error, data) => {
                        if (error) {
                        reject(error);
                        return;
                        }
                        fulfill(true);
                    });
                });
    },

    getMonthEvents(month,year){
        return this.getCurrentEvents().then((eventFile)=>{
            var eventObj = JSON.parse(eventFile);

            var monthEventObj = eventObj.map((x)=>{
                if(x.month === month)
                    if(x.year === year)
                        {
                            return x;
                        }
                            
                });

            return Promise.resolve(monthEventObj);
        })

    },

    getEvent(id){
        return this.getCurrentEvents().then((eventFile)=>{
            var eventObj = JSON.parse(eventFile);
             return eventObj.map((x)=>{
               return x.events.filter((y)=>{
                   if(y.id === id){
                    return y;}
               }).shift();       
            });

        });
    },

    insertEvent(insertData){

        return this.getCurrentEvents().then((eventFile)=>{

            if(typeof insertData.title!=="string") throw "title must be a string";
            if(!insertData.title) throw "title cannot be empty";
            if(typeof insertData.location!=="string") throw "location must be a string";
            if(!insertData.location) throw "location cannot be empty";
            if(typeof insertData.description!=="string") throw "Description must be a string";
            if(!insertData.description) throw "Description cannot be empty";



            var eventObj = JSON.parse(eventFile);
            


            var addDateObj = {
                "id":uuid.v4(),
                "day":null,
                "month":null,
                "year":null,
                "events":[]
            };

            var addEventObj = {
                    "id":uuid.v4(),
                    "title":null,
                    "location":null,
                    "description":null,
                    "date":null
                };
            
            var dateVal = new Date(insertData.date);

            var oneEventObj = eventObj.filter((x)=>{
                if(x.day === dateVal.getDate())
                    if(x.month === (dateVal.getMonth()+1))
                        if(x.year === dateVal.getFullYear())
                        {

                            return x;
                        }
                            
                }).shift();

            if(eventObj.length == 0 || !oneEventObj)
            {
                addEventObj.title = insertData.title;
                addEventObj.location = insertData.location;
                addEventObj.description = insertData.description;
                addEventObj.date = dateVal;

                addDateObj.day = dateVal.getDate();
                addDateObj.month = dateVal.getMonth()+1;
                addDateObj.year = dateVal.getFullYear();
                addDateObj.events.push(addEventObj);

                eventObj.push(addDateObj);


                return this.saveEvents(eventObj).then((fulfilled)=>{
                    if(fulfilled)
                    return addEventObj.id;
                });

            }
            else
            {
                addEventObj.title = insertData.title;
                addEventObj.location = insertData.location;
                addEventObj.description = insertData.description;
                addEventObj.date = dateVal;
                oneEventObj.events.push(addEventObj);

                return this.saveEvents(eventObj).then((fulfilled)=>{
                    if(fulfilled)
                    return addEventObj.id;
                });
            }            

        });
    }
}

module.exports = exportedMethods;