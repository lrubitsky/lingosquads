class UserSerializer {
  static getProfiles(array) {
    const requiredAttributes = [
      "username",
      "firstName",
      "lastName",
      "nativeLanguage",
      "englishLevel",
      "ageRange",
      "location",
      "introduction",
      "travel",
      "music",
      "careers",
      "sports",
      "relationships",
      "community",
      "technology",
      "fashion",
      "politics",
      "pets",
      "food",
      "movies",
      "id",
      "imageUrl",
    ];
    const serializedUsers = array.map((user) => {
      let serializedUser = {};
      for (const attribute of requiredAttributes) {
        if (attribute === "lastName") {
          serializedUser[attribute] = user[attribute][0] + ".";
        } else {
          serializedUser[attribute] = user[attribute];
        }
      }
      return serializedUser;
    });
    return serializedUsers;
  }

  static getProfileOfOne(user) {
    const requiredAttributes = [
      "username",
      "firstName",
      "lastName",
      "nativeLanguage",
      "englishLevel",
      "ageRange",
      "location",
      "introduction",
      "travel",
      "music",
      "careers",
      "sports",
      "relationships",
      "community",
      "technology",
      "fashion",
      "politics",
      "pets",
      "food",
      "movies",
      "id",
      "imageUrl",
      "cryptedPassword",
    ];

    const serializedUser = {};
    for (const attribute of requiredAttributes) {
      if (attribute === "lastName") {
        serializedUser[attribute] = user[attribute][0] + ".";
      } else {
        serializedUser[attribute] = user[attribute];
      }
    }
    return serializedUser;
  }

  static getPrivateDetailsOfCurrentUser(user) {
    const requiredAttributes = [
      "username",
      "firstName",
      "lastName",
      "email",
      "nativeLanguage",
      "englishLevel",
      "ageRange",
      "location",
      "introduction",
      "travel",
      "music",
      "careers",
      "sports",
      "relationships",
      "community",
      "technology",
      "fashion",
      "politics",
      "pets",
      "food",
      "movies",
      "id",
      "imageUrl",
    ];

    const serializedUser = {};
    for (const attribute of requiredAttributes) {
      serializedUser[attribute] = user[attribute];
    }
    return serializedUser;
  }
}

export default UserSerializer;
