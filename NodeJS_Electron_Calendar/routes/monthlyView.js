const express = require('express');
const router = express.Router();
const data = require("../data");
const monthData = data.month;
const moment = require("moment");
var currentDate = new Date();
var xss = require('xss');

router.get("/:id", (req, res) => {
    if(req.params.id === 'prev')
    {
        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth()-1);
    }
    if(req.params.id === 'next')
    {
        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth()+1);
    }
    var date = currentDate;
    monthData.getMonthEvents(date.getMonth()+1,date.getFullYear()).then((eventList) => {

        var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        var monthShortNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        var month = monthNames[date.getMonth()];
        var monthShortName = monthShortNames[date.getMonth()];
        var year = date.getFullYear();

        var startingDay =  new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        var noOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        var noOfDaysPreviousMonth = null;
        if(date.getMonth() === 0) 
         noOfDaysPreviousMonth = 31;
        else
        noOfDaysPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        var noOfDaysNextMonth = 42 - (noOfDays+startingDay);


        var currentMonth = [];
        var previousMonth = [];
        var nextMonth = [];

        var dayObjPrev = new Array(startingDay); //for the previous month and next month
        var dayObjNext = new Array(noOfDaysNextMonth);
        var currentEventObj = new Array(noOfDays); // for the current month

        
       if(startingDay > 0)
       {
            for(var i=0;i<startingDay;i++)
            {
                dayObjPrev[i] = {day:noOfDaysPreviousMonth - (startingDay-1-i)};
                previousMonth.push(dayObjPrev[i]);
            }
       }

       for(var i=1;i<=noOfDays;i++)
       {
           var value = dayNames[new Date(date.getFullYear(), date.getMonth(), i).getDay()];
           currentEventObj[i-1] = {
               day:i,
               month:monthShortName,
               year:year,
               dayVal:value,
               events:eventList.filter((x)=>{
                if(x!= undefined){
               if(x.day === i)
               return x.events;
               }
           }).shift()
           };

           currentMonth.push(currentEventObj[i-1]);
       }

       for(var i=1;i<=noOfDaysNextMonth;i++)
       {
           dayObjNext[i-1] = {day:i};
           nextMonth.push(dayObjNext[i-1]);
       }
       var availableEvents = false;
       if(currentMonth.events)
       availableEvents = true;
        res.render("calender/monthly", {dateValue:new Date(),currentMonth:month,currentYear:year,prevMonth:previousMonth,currMonth:currentMonth,nextMonth:nextMonth,availableEvents:availableEvents});
    }).catch((e) => {

        res.status(404).json({ error: "User not found" });
    });
});

router.post("/addevent",(req,res)=>{
    var dateVal = new Date(req.body.dateValue);
    var monthCheck = true;
    if(req.body.checkValue === 'Y')
        monthCheck = true;
    else
        monthCheck = false;

    res.render("calender/addevent", {dateToAdd:req.body.dateValue, day:dateVal.getDate(), month:dateVal.getMonth()+1, year:dateVal.getFullYear(), monthCheck:monthCheck});
});

router.post("/insertEvent",(req,res)=>{

    var insertData = req.body;
    return monthData.insertEvent(insertData).then((newlyAddedEvent)=>{
            res.json({success:true,message:"Event Created successfully!!",addedEvent:newlyAddedEvent});
           //var dateVal = new Date(insertData.date);
           //var dateDisplay = (dateVal.getMonth()+1) +"/"+ dateVal.getDate()+"/"+ dateVal.getFullYear();
           //res.render("calender/viewevent", {title:insertData.title, location:insertData.title, description:insertData.description, dateDisplay:dateDisplay,dateValue:insertData.date});
    }).catch((e) => {
            res.json({error:true,message:e});
    });
});

router.get("/getEvent/:id",(req,res)=>{
    var id = req.params.id;
    monthData.getEvent(id).then((eventObj)=>{

        eventObj.forEach((obj)=>{
            if(obj)
            {
                var dateVal = new Date(obj.date);
                var dateDisplay = (dateVal.getMonth()+1)+"/"+dateVal.getDate()+"/"+dateVal.getFullYear();
                var event = {
                    "location":xss(obj.location),
                    "dateDisplay":xss(dateDisplay),
                    "description":xss(obj.description),
                    "title":xss(obj.title),
                    "date":xss(obj.date)
                }

                res.render("calender/viewevent", {event:event});
            }
        });
        
        
        
    })
    
    
});

router.get("/", (req, res) => {
    var date = new Date();
    currentDate = date;
    monthData.getMonthEvents(date.getMonth()+1,date.getFullYear()).then((eventList) => {

        var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        var monthShortNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        var month = monthNames[date.getMonth()];
        var monthShortName = monthShortNames[date.getMonth()];
        var year = date.getFullYear();

        var startingDay =  new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        var noOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        var noOfDaysPreviousMonth = null;
        if(date.getMonth() === 0) 
         noOfDaysPreviousMonth = 31;
        else
        noOfDaysPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        var noOfDaysNextMonth = 42 - (noOfDays+startingDay);


        var currentMonth = [];
        var previousMonth = [];
        var nextMonth = [];

        var dayObjPrev = new Array(startingDay); //for the previous month and next month
        var dayObjNext = new Array(noOfDaysNextMonth);
        var currentEventObj = new Array(noOfDays); // for the current month

        
       if(startingDay > 0)
       {
            for(var i=0;i<startingDay;i++)
            {
                dayObjPrev[i] = {day:noOfDaysPreviousMonth - (startingDay-1-i)};
                previousMonth.push(dayObjPrev[i]);
            }
       }
       
       for(var i=1;i<=noOfDays;i++)
       {
           var value = dayNames[new Date(date.getFullYear(), date.getMonth(), i).getDay()];
           currentEventObj[i-1] = {
               day:i,
               month:monthShortName,
               year:year,
               dayVal:value,
               events:eventList.filter((x)=>{
               if(x != undefined){
               if(x.day === i)
               return x.events;
               }
           }).shift()
           };

           currentMonth.push(currentEventObj[i-1]);
       }
       
       for(var i=1;i<=noOfDaysNextMonth;i++)
       {
           dayObjNext[i-1] = {day:i};
           nextMonth.push(dayObjNext[i-1]);
       }
       var availableEvents = false;
       if(currentMonth.events)
       availableEvents = true;

        res.render("calender/monthly", {dateValue:date,currentMonth:month,currentYear:year,prevMonth:previousMonth,currMonth:currentMonth,nextMonth:nextMonth,availableEvents:availableEvents});
    }).catch((e) => {
        res.status(404).json({ error: "User not found" });
    });
});

module.exports = router;