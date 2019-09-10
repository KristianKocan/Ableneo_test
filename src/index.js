import React from "react";
import { render } from "react-dom";
import App from "./App";
import _ from "lodash";

// You have users object reference from previous exercise.
// Write functions what will get various data from users object.
const users = [
  { id: 1, name: "c", role: "admin", score: 2 },
  { id: 2, name: "b", role: "user", score: 10 },
  { id: 3, name: "a", role: "user", score: 30 }
];

// 0.Write stateles component which will print all user names in list
function UsersComponent({ users }) {
  const createItem = function(items) {
    var array = [];
    items.forEach(item => {
      array.push(<li key={item.id}>name: {item.name}</li>);
    });
    return array;
  };
  // your code here
  return <ul>{createItem(users)}</ul>;
} /* output 
<ul>
  <li>name: c</li>
  <li>name: b</li>
  <li>name: a</li>
</ul>
*/

// 1.Write function that will return user by id.
function getById(users, id = 2) {
  // your code here
  /*var result;
  users.forEach(user => {
    if (user.id === id) {
      result = user;
    }
  });
  return result;*/
  return _.find(users, { id: id });
} // output {id: 2, name: "b", role: "user", score: 10}

// 2.Write function that will return users by role.
function getByRole(users, role = "admin") {
  // your code here
  /*var result = [];
  users.forEach(user => {
    if (user.role === role) {
      result.push(user);
    }
  });
  return result;*/
  return _.filter(users, { role: role });
} // output [{id: 1, name: "c", role: "admin", score: 2}]

// 3.Write function that will return object with roles as keys and values as number of role occurrences.
function getRoleMetrics(users) {
  // your code here
  var roles = [];
  users.forEach(user => {
    roles.push(user.role);
  });
  return _.countBy(roles);
} // output {admin: 1, user: 2}

// 4.Write function that will return users ordered by name.
function getOrderedByName(users) {
  // your code here
  return _.sortBy(users, ["name"]);
} // output order [{id:3, name: "a",...},{id:2, name: "b",...},{id:1, name: "c", ...}]

// 5.Write function that will return users ordered by highest score.
function getOrderedByScore(users) {
  // your code here
  return _.orderBy(users, ["score"], ["desc"]);
} // output order [{id:3, score: 30, ...},{id:2, score: 10, ...}, {id:1, score: 2,...}]

// 6. Write function that will return new users collection with added user.
function addUser(
  users,
  userToAdd = { id: 4, name: "d", role: "user", score: 50 }
) {
  // your code here
  var result = _.map(users, _.clone);
  result.push(userToAdd);
  return result;
} // output length === 4

// 7. Write function that will return new users collection without removed user.
function removeUserById(users, userId = 2) {
  // your code here
  var result = _.map(users, _.clone);
  _.remove(result, {
    id: userId
  });
  return result;
} // output length === 2

render(
  <App
    users={users}
    UsersComponent={UsersComponent}
    getById={getById}
    getByRole={getByRole}
    getRoleMetrics={getRoleMetrics}
    getOrderedByName={getOrderedByName}
    getOrderedByScore={getOrderedByScore}
    addUser={addUser}
    removeUserById={removeUserById}
  />,
  document.getElementById("root")
);
