Tickets = new Meteor.Collection('tickets');
Indexes = new Meteor.Collection('indexes');

if (Meteor.isClient) {
  Template.main.rendered = function(){
    var vm = new Vue({
      el: "#main",
      data: {
        title: "Test #1",
        name: "",
      },
      computed: {
        boards: function(){
          var result = this.indexes.map(function(index){
            var tickets = Tickets.find({indexId: index._id}).fetch();
            return {
              name: index.name,
              indexId : index._id,
              tickets: tickets 
            }
          });
          return result;
        }
      },
      sync: {
        'indexes': function(){
            return Indexes.find();
        },
        'tickets': function() {
            return Tickets.find();
        }
      },
      methods: {
        addTicket: function(e, name, indexId){
          e.preventDefault();
          Tickets.insert({name: name, status:"", indexId: indexId});
          this.name ="";
        },
        setStatus: function(id, status){
          Tickets.update(id, {$set: {
            status: status
          }});
        },
        addIndex: function(){
          Indexes.insert({name: "New Index"});
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
