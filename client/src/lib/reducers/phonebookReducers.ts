
import type { Person } from "../types/person.ts";

// interface personState extends Array<Person>{};

export const personReducer = (state:Array<Person> = [], action: any) => {
  switch(action.type) {
    case "SET_PERSONS":
      return action.payload;
    default:
      return state;
  }
};

export const setPersons = (input:Array<Person>) => {
  return {
    type: "SET_PERSONS",
    payload: input
  };
};

export const personFilterReducer = (state:String="", action: any) => {
  switch(action.type) {
    case "SET_PERSON_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const setPersonFilter = (input:String) => {
  return {
    type: "SET_PERSON_FILTER",
    payload: input
  };
};

export default {
  persons: personReducer,
  personFilter: personFilterReducer,
};