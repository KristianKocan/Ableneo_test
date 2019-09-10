import React from "react";
import _ from "lodash";

const isFunction = maybeFn => typeof maybeFn === "function";
const print = data => JSON.stringify(data, undefined, 2);
const expect = (users, fn, dataExpected) => {
  const originalUsers = _.cloneDeep(users);

  const otherUsers = [
    {id: 4, name: "d", role: "admin", score: 1},
    {id: 5, name: "b", role: "user", score: 100},
    {id: 6, name: "f", role: "admin", score: 60},
  ];

  if (
    typeof fn(users) !== "undefined" &&
    _.isEqual(fn(users), fn(otherUsers))
  ) {
    return (
      <pre style={{color: "red"}}>
        {`// ✂️ test failing 
you are not using function`}
      </pre>
    );
  }

  const output = fn(users);

  if (!_.isEqual(users, originalUsers)) {
    return (
      <pre style={{color: "red"}}>
        {`// 🔐 test failing 
you are modifing users object`}
      </pre>
    );
  }

  if (typeof output === "undefined") {
    return (
      <pre style={{color: "#B7950B"}}>{`// ✍️️ write excercise code

${print(output)} isNotEqual ${print(dataExpected)}`}</pre>
    );
  }

  return _.isEqual(output, dataExpected) ? (
    <pre style={{color: "green"}}>
      {`👍 test passing 

isEqual ${print(dataExpected)}`}
    </pre>
  ) : (
    <pre style={{color: "red"}}>{`// 🚨 test failing 

${print(output)} isNotEqual ${print(dataExpected)}`}</pre>
  );
};

const App = ({
  users,
  UsersComponent,
  getById,
  getByRole,
  getRoleMetrics,
  getOrderedByName,
  getOrderedByScore,
  addUser,
  removeUserById,
}) => (
  <div style={{fontFamily: "monospace"}}>
    <h1>React Javascript test</h1>
    <h3>Write functions what will get various data from users object.</h3>
    <p>
      While you will be writing excercises. You will see live reloaded tests
      changing color to <span style={{color: "green"}}>"green"</span> when
      passing.
    </p>

    <pre>const users = {JSON.stringify(users, undefined, 2)}</pre>

    <h3>0.Write stateles component which will print all user names in list</h3>

    <UsersComponent users={users} />
    <h4>expect</h4>
    <ul>
      <li>name: c</li>
      <li>name: b</li>
      <li>name: a</li>
    </ul>

    <h3>1.Write function that will return user by id.</h3>
    {expect(users, getById, {
      id: 2,
      name: "b",
      role: "user",
      score: 10,
    })}

    <h3>2.Write function that will return users by role.</h3>
    {expect(users, getByRole, [
      {
        id: 1,
        name: "c",
        role: "admin",
        score: 2,
      },
    ])}

    <h3>
      3.Write function that will return object with roles as keys and values as
      number of role occurrences.
    </h3>
    {expect(users, getRoleMetrics, {admin: 1, user: 2})}

    <h3>4.Write function that will return users ordered by name.</h3>
    {expect(users, getOrderedByName, [
      {id: 3, name: "a", role: "user", score: 30},
      {id: 2, name: "b", role: "user", score: 10},
      {id: 1, name: "c", role: "admin", score: 2},
    ])}

    <h3>5.Write function that will return users ordered by highest score.</h3>
    {expect(users, getOrderedByScore, [
      {id: 3, name: "a", role: "user", score: 30},
      {id: 2, name: "b", role: "user", score: 10},
      {id: 1, name: "c", role: "admin", score: 2},
    ])}

    <h3>
      6. Write function that will return new users collection with added user.
    </h3>
    {expect(users, addUser, [
      {id: 1, name: "c", role: "admin", score: 2},
      {id: 2, name: "b", role: "user", score: 10},
      {id: 3, name: "a", role: "user", score: 30},
      {id: 4, name: "d", role: "user", score: 50},
    ])}

    <h3>
      7. Write function that will return new users collection without removed
      user.
    </h3>
    {expect(users, removeUserById, [
      {id: 1, name: "c", role: "admin", score: 2},
      {id: 3, name: "a", role: "user", score: 30},
    ])}
  </div>
);

export default App;
