Meteor.methods({
    getUserID: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    createSession: function (uid) {
        var key = getNewSyncCode();
        var id = Sessions.insert({code: key, members: [uid[0]]});
        return key;
    },

    getSessionMembers: function(args) {
        var key = args[0];
        var session = Session.findOne({code: key});
        return session.members;
    },

    joinSession: function(args) {
        var key = args[0];
        var uid = args[1];
        var session = Sessions.findOne({code: key});
        Session.update(session, {$push: {members: uid}});
        return 1;
    },

    addSessionData: function(args) {
        var key = args[0];
        var dataKey = args[1];
        var data = args[2];
        var session = Sessions.findOne({code: key});
        session[dataKey] = data;
        Session.update({_id: session._id}, session);
        return 1;
    },

    getSessionData: function(args) {
        var key = args[0];
        var dataKey = args[1];
        var session = Sessions.findOne({code: key});
        return session[dataKey] || 1;
    },

    leaveSession: function(args) {
        var key = args[0];
        var uid = args[1];
        var session = Sessions.findOne({code: key});
        var members = sessions.members;
        members.splice(members.indexOf(uid), 1);

        if (members.length === 0) {
            // Session.remove(session);
        }
        else {
            Session.update(session, {$set: {members: members}});
        }
        return 1;
    },



});

function getNewSyncCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
