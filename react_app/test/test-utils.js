import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import ReactTestUtils from 'react-dom/test-utils';
import fs from 'fs'
import EasyGraphQLTester from 'easygraphql-tester';
import {MemoryRouter} from 'react-router-dom'
import {MockedProvider} from '@apollo/client/testing';
import {act} from "@testing-library/react";
import wait from "waait";
import 'jest-canvas-mock';

export const createContainer = () => {
  const container = document.createElement('div');
  const mocks = []
  const route = ['/']
  const render = component => {
    ReactDOM.render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={route}>
          {component}
        </MemoryRouter>
      </MockedProvider>, container)
  }
  const waitFor = async time => await act(async () => wait(time))
  const find = id => {
    const element = container.querySelector(id);
    if (element) return element;
    else return document.querySelector(id)
  }
  const change = (id, value) => {
    let element = container.querySelector(id);
    if (element) {
      if (value) element.value = value
      ReactTestUtils.Simulate.change(element);
    }
    else {
      element = document.querySelector(id)
      if (element) element.value = value
      ReactTestUtils.Simulate.change(element)
    }
  }
  const click = async id => {
    const element = container.querySelector(id);
    if (element) ReactTestUtils.Simulate.click(element);
    else ReactTestUtils.Simulate.click(document.querySelector(id))
  };
  const keyPress = (id, key) => ReactTestUtils.Simulate.keyPress(find(id), {key : key});
  return {
    container,
    render,
    click,
    change,
    find,
    keyPress,
    mocks,
    route,
    act,
    waitFor,
  };
};

export const testAgainstSchema =  mock => {
  const schema = fs.readFileSync('schema.graphql', 'utf8')
  const tester = new EasyGraphQLTester(schema)
  tester.test(true, mock.request)
  tester.setFixture(mock.result(), { autoMock: true })
  const { data  } = tester.mock(mock.request)
  expect(data).toEqual(mock.result().data)
}