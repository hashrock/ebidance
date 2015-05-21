Tickets = new Meteor.Collection('tickets');

if (Meteor.isClient) {
  Template.main.rendered = function(){
    var vm = new Vue({
      el: "#main",
      data: {
        title: "Test #1",
        name: ""
      },
      sync: {
        'tickets': function() {
            return Tickets.find();
        }
      },
      methods: {
        addTicket: function(e){
          e.preventDefault();
          Tickets.insert({name: this.name, status:""});
          this.name ="";
        },
        setStatus: function(id, status){
          Tickets.update(id, {$set: {
            status: status
          }});
        }
      }
    });
  }
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
