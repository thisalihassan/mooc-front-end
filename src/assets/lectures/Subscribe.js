let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let EnrollSchema = new Schema({
  UserFollowing: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      subscribes: [
        {
          type: Schema.Types.ObjectId,
          ref: "user"
        }
      ]
    }
  ],

  UserFollowers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      subscribers: [
        {
          type: Schema.Types.ObjectId,
          ref: "user"
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Subscribe", EnrollSchema);
