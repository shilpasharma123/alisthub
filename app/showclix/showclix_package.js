

var showClix   = require('./../../constant.js');
var request    = require('request');
module.exports = function()
{

 this.add_package = function(data,res,next)
  {

// var fields = ['package_name', '', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', '', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];

/*
data.user_id - (int) 
data.seller_id - (int) 
data.event - (string) 
data.behavior_set - (int) 
data.description - (string) 
data.private_event - (int) 1- don't show up in searches and public listings
                           0- show up in searches and public listings
data.ages - (int) 0,18,19,21
data.genre -  (string) Genre of the event. Open Field. e.g. Pop, Classical, Rock, Raffle, etc.
data.event_type - (int) 3 for General Admission Event, 2 for an Assigned Seating Event

*/
   var input = {
  "user_id": data.showclix_user ,
  "seller_id": data.showclix_seller ,
  "event": data.package_name ,
  "behavior_set": "5",
  "description": data.package_description ,
  "private_event": "0",
  "ages": data.ages ,
  "image": data.image,
  "event_category_id": data.category,
  "date_added": data.created ,
  "date_edited": data.modified ,
  "event_start": "2016-07-15 03:30:30",
  "sales_open": "2016-07-10 03:30:30",
  "event_end": "2016-07-21 21:00:00",
  "short_name": data.short_name ,
  "image_url": data.image,
  "thumbnail_url": data.image,
  "status":data.status,
  "event_type":"3",
  "venue_id":"34657" ,
  "display_image" : data.display_image_in_listing , 
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


if(data.id) {
 input.event_id = "4206298";
} 


console.log('------------------***************--------------------');
console.log(input);

return true;

/*
var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

                request.post( postData, function(error, response, body){
                  var str = response.body;
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
*/


    
  }
   

 
   this.add_events_of_package = function(data,res,next)
  {
     var input = {
                    "package_id": data.package_id,
                    "event_id": data.event_id
                  };
console.log('input : ' ,  input );
var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

    request.post( postData, function(error, response, body){
                  return next({status:1});
                  /*var str = response.body;
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
                  */
               });
    
  } 



  


  this.postThirdStepPackageData = function(data,res,next)
  {

// var fields = ['package_name', '', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', '', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];

/*
data.user_id - (int) 
data.seller_id - (int) 
data.event - (string) 
data.behavior_set - (int) 
data.description - (string) 
data.private_event - (int) 1- don't show up in searches and public listings
                           0- show up in searches and public listings
data.ages - (int) 0,18,19,21
data.genre -  (string) Genre of the event. Open Field. e.g. Pop, Classical, Rock, Raffle, etc.
data.event_type - (int) 3 for General Admission Event, 2 for an Assigned Seating Event


display_image
Description: int. A value of 1 will show the events image as part of the event listing on ShowClix

url
Description: string. url to an external event website
Rule Regex: /^https?:\/\/[a-zA-Z0-9.\-]+\.[a-zA-Z]+(\/.*)?$/

image
Description: string. code relies on these images in a certain dir, should fix to work with full uri with api

sales_close
Description: string. hours:minutes before the start of the event that sales should close

delivery_type
Description:
1- Print At Home
0- Always Available
2- Never Available

donation_live
Description: string. Should ShowClix accept donations for the seller? Set to 'y' if so.
Rule In: y, n


donation_name
Description: string. The name of the charity or organization being donated to
Required: No
Rule : N/A

custom_buyer_fee
Description: float. Any custom fees setup for this seller

buyer_fee
Description: float. probably the most confusing attribute name. this is the TOTAL SERVICE FEE


private_event
1- yes
0- no

show_seating_chart
Description: int. A value of 1 will bring up the link to the venue seating chart (used to be set in the color_schemes table)

 var fields = ['' , 'print_enable_date' , 'print_disable_date' , '' , '' , '' , '' , 'custom_fee_name' , 'custom_fee_type' , 'custom_fee_amount' , 'custom_when' , 'online_service_fee' , 'box_office_service_fee' , '' , '' , '' , 'collect_name' , '' , '' , '' ]; 
*/



var donation_live = 'n';
var delivery_type_2 = 0 ;
var status = 3;

var checkout_time_limit_in_seconds = data.checkout_time_limit * 60 ;
if(data.donation == 1 ) { donation_live = 'y'; } else {  donation_live = 'n'; }

if(data.print_home == 1 ) { delivery_type_2 = 1; } 
if(data.print_home == 2 ) { delivery_type_2 = 0; } 
if(data.print_home == 3 ) { delivery_type_2 = 2; } 

   var input = {
  "user_id": data.showclix_user ,
  "seller_id": data.showclix_seller ,
  "event_id": data.id ,
  "will_call_ticketing" : null ,
  "delivery_type_2" : delivery_type_2 ,
  "description_2" : data.print_description ,
  "donation_live" : donation_live ,
  "donation_name" : data.donation_name ,
  "custom_buyer_fee" : data.custom_fee ,
  "ticket_note": data.ticket_note ,
  "ticket_purchase_limit": data.ticket_transaction_limit ,
  "ticket_purchase_timelimit": data.checkout_time_limit_in_seconds ,
  "private_event": data.private_event ,
  "short_name": data.url_short_name ,
  "date_edited": data.modified ,
  "status": status ,
};

console.log('-------------********** input ********-------------------');
console.log(input);

var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

                request.put( postData, function(error, response, body){
                  var str = response.body;
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
   


}
