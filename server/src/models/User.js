/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username", "firstName", "lastName"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string", minLength: 8 },
        username: { type: "string", maxLength: 36 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        nativeLanguage: { type: "string" },
        englishLevel: { type: "string" },
        ageRange: { type: "string" },
        location: { type: "string" },
        introduction: { type: "string" },
        travel: { type: ["boolean"] },
        music: { type: ["boolean"] },
        careers: { type: ["boolean"] },
        sports: { type: ["boolean"] },
        relationships: { type: ["boolean"] },
        community: { type: ["boolean"] },
        technology: { type: ["boolean"] },
        fashion: { type: ["boolean"] },
        politics: { type: ["boolean"] },
        pets: { type: ["boolean"] },
        food: { type: ["boolean"] },
        movies: { type: ["boolean"] },
        imgUrl: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { LanguageGroup, Interest } = require("./index.js");
    return {
      languageGroupsCreated: {
        relation: Model.HasManyRelation,
        modelClass: LanguageGroup,
        join: {
          from: "users.id",
          to: "languageGroups.creatorId",
        },
      },
      languageGroupsJoined: {
        relation: Model.ManyToManyRelation,
        modelClass: LanguageGroup,
        join: {
          from: "users.id",
          through: {
            from: "participations.participantId",
            to: "participations.languageGroupId",
          },
          to: "languageGroups.id",
        },
      },
      interests: {
        relation: Model.ManyToManyRelation,
        modelClass: Interest,
        join: {
          from: "users.id",
          through: {
            from: "interestSelections.userId",
            to: "interestSelections.interestId",
          },
          to: "interests.id",
        },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
