var showClix   = require('./../../constant.js');
var request    = require('request');
module.exports = function()
{
  this.add_venue = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.post({
                headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     showClix.addVenue,
                form:    { "venue_name": req.body.venue_name,
              "seating_chart_name": "",
              "capacity": req.body.capacity,
              "description": "test description",
              "booking_info": null,
              "image": null,
              "seating_chart": null,
              "seating_chart_type": "2",
              "url": req.body.url,
              "contact_name": req.body.contact_name,
              "contact_title": null,
              "address": "test Elante address",
              "city": req.body.city,
              "state": req.body.state,
              "zip": req.body.zipcode,
              "country": req.body.country,
              "phone": req.body.phone,
              "fax": req.body.fax,
              "email": req.body.email,
              "timezone": null,
              "status": "2",
              "lat": req.body.phone,
              "lng": req.body.phone,
              "timezone_name": req.body.timezone
            } }, function(error, response, body){
                   if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                                      
                   }
                   
               });
    
  }
  this.add_event = function(data,res,next)
  {
    // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    var input = {
                 "event":data.eventname,
                 "description":data.content,
                 "short_name":data.eventurl,
                 "event_start":data.event_startdatetime,
                 "sales_open":data.event_startdatetime,
                 "user_id":data.showclix_user_id,
                 "seller_id":data.showclix_seller_id,
                 "venue_id":"34657",
                 "event_type":"3",
                 "status":data.step
                };
   
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input }, function(error, response, body){
                  var str = response.body;
                  console.log(response.body);
                                  
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }
                   
               });
    
  }
  
  this.add_price_level = function(data,res,next)
  {
      var input = {
                 "event_id":data.showclix_id,
                 "level":data.price_level,
                 "active":1
                  };
      //{"event_id":"4194781","min_price":"2","bos_price":"8","price":"10","level":"Term","limit":70,"active":"1","description":"This is test description"}
      if(data.showclix_price_id) {  input.level_id = data.showclix_price_id;  }
      if(data.online_price)    {    input.price = data.online_price; }
      if(data.minimum_price)   {    input.min_price = data.minimum_price; }
      if(data.box_office_price){    input.bos_price = data.box_office_price; }
      if(data.quantity_available){  input.limit = data.quantity_available; }
      if(data.description)     {    input.description = data.description; }
      if(data.minimum_per_order){   input.increment_by = data.minimum_per_order; }
      if(data.maximum_per_order){   input.transaction_limit = data.maximum_per_order; }
      if(data.suggested_price){     input.upsell_price = data.suggested_price; }
      if(data.hide_in_box_office){  input.box_office_hide = data.hide_in_box_office; }
      
      request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/PriceLevel",
                form:    input }, function(error, response, body){
                  var str = response.body;
                  console.log(response.body);
                                  
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }
                   
               });
  }
  
  this.add_series_event = function(req,res,next)
  {
    // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':'e4fe17d8b0e3648ca40807bdb511e5582de018d265c36dbd0ec1a6499e69f356'},
                url:     "http://api.showclix.com/Event",
                form:    {"user_id":"28676","seller_id":"22876","venue_id":"34657","event":req.eventname,"description":req.content,"inventory":"600","private_event":"0","price":"18.00","price_label":"General Admission","price_limit":"1","ticket_purchase_timelimit":null,"ticket_purchase_limit":null,"will_call_ticketing":null,"ages":"0","image":"20091252630916.jpg","url":null,"event_type":"3","ticket_note":null,"status":"1","keywords":null,"sales_open":req.eventdate,"event_start":req.eventdate,"short_name":req.short_name,"display_image":"1","behavior_set":"3","position":"3"} }, function(error, response, body){
                  console.log(response);
                  console.log(body);
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                   return next({status:0,location:""});
                                      
                  }
                   
               });
    
  }
  
  
  this.add_price_level11 = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.post({
                headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     showClix.addVenue,
                form:    { "venue_name": req.body.venue_name,
              "seating_chart_name": "",
              "capacity": req.body.capacity,
              "description": "test description",
              "booking_info": null,
              "image": null,
              "seating_chart": null,
              "seating_chart_type": "2",
              "url": req.body.url,
              "contact_name": req.body.contact_name,
              "contact_title": null,
              "address": "test Elante address",
              "city": req.body.city,
              "state": req.body.state,
              "zip": req.body.zipcode,
              "country": req.body.country,
              "phone": req.body.phone,
              "fax": req.body.fax,
              "email": req.body.email,
              "timezone": null,
              "status": "2",
              "lat": req.body.phone,
              "lng": req.body.phone,
              "timezone_name": req.body.timezone
            } }, function(error, response, body){
                   if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                                      
                   }
                   
               });
    
  }
  this.delete_event = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.delete({
              headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
              url:     showClix.deleteEvent,
              form:    { } }, function(error, response, body){
                 
                 console.log(response);
                 console.log(body);
                 /*  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                   }
                  */ 
               });
    
  }
  
  this.add_package = function(data,res,next)
  {
     var input = {
                  "event": "Static Package By SHOWCLIX API",
                  "behavior_set": "5",
                  "description": "Static Package description By SHOWCLIX API",
                  "private_event": "0",
                  "ages": "18",
                  "image": null,
                  "event_category_id": "5",
                  "genre": null,
                  "date_added": "2016-06-21 05:18:02",
                  "date_edited": null,
                  "event_start" : "2016-08-24 13:05:45",
                  "event_end": "2016-08-26 13:05:45",
                  "short_name": "static_package_short_name",
                  "user_id": "28676",
                  "seller_id": "22876",
                  "venue_id":"34657",
                  "event_type":"3",
                  "status": "1",
                  "image_url": null,
                  "thumbnail_url": null,
                  "product_map": {
                              "892707": {
                                  "event_product_map_id": "892707",
                                  "event_id": "4206298",
                                  "product_id": "1878",
                                  "price": "22.00",
                                  "upsell_price": null,
                                  "position": "3",
                                  "sort_position": null,
                                  "box_office_hide": "0"
                              }

                          },

                };

 //"event_id": "4206298",
 //"event_category_id": "5",

console.log('data : ' , data );
console.log('data.showclix_token : ' , data.showclix_token );
console.log('input : ' ,  input );

var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

    request.post( postData, function(error, response, body){
                  var str = response.body;
                  console.log(response.body);
                                  
                 /* if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }

                  */
                   
               });
    
  }
  
 
   this.add_events_of_package = function(data,res,next)
  {
     var input = {
                    "package_id": "4206298",
                    "event_id": "4203183"
                  };

console.log('data : ' , data );
console.log('data.showclix_token : ' , data.showclix_token );
console.log('input : ' ,  input );

var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

    request.post( postData, function(error, response, body){
                  var str = response.body;
                  console.log(response.body);
                                  
                 /* if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }

                  */
                   
               });
    
  } 
}