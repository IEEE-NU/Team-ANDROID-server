if (Sessions.find().count() === 0) {
    Sessions.insert({code: "balloon", members: []});
}
