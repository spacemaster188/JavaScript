;(function () {
  var styles = document.createElement('style');
  styles.innerHTML += '.output-node p {margin: 1px 0;}';
  styles.innerHTML += '.output-node {margin-top: 20px; line-height: 1.5;}';
  styles.innerHTML += '.failed-assert {color: #B22}';
  styles.innerHTML += '.summary {font-weight: 600}';
  styles.innerHTML += '.all-passed {color: #5D2}';
  document.body.appendChild(styles);
  var outputNode = document.createElement('div');
  outputNode.classList.add('output-node');
  var getResult = function getResult() {
    return +screenElement.innerHTML;
  };

  var log = function log(msg) {
    var el = document.createElement('p');
    el.classList.add('failed-assert');
    el.innerHTML = msg;
    outputNode.appendChild(el);
  };

  var assertError = function assertError(context) {
    throw { type: 'ASSERTATION_ERROR', context: context };
  };

  var assert = {
    'true': function _true(expr) {
      if (expr === false) {
        assertError(expr + ' is not true');
      }
    },
    equals: function equals(lvalue, rvalue) {
      if (lvalue !== rvalue) {
        assertError(lvalue + ' is not equals to ' + rvalue);
      }
    },
    notEquals: function notEquals(lvalue, rvalue) {
      if (lvalue === rvalue) {
        assertError(lvalue + 'is equals to ' + rvalue);
      }
    }
  };

  var result = {
    shouldBe: function shouldBe(expr) {
      return assert.equals(getResult(), expr);
    },
    shouldNotBe: function shouldNotBe(expr) {
      return assert.notEquals(getResult(), expr);
    }
  };

  var cases = [];

  var describe = function describe(name, testCase) {
    cases.push({ name: name, testCase: testCase });
  };

  var beforeCb = function beforeCb() {};
  var beforeEach = function beforeEach(cb) {
    beforeCb = cb;
  };

  var runTests = function runTests() {
    var errorCount = 0;
    var failCount = 0;
    cases.map(function (d) {
      try {
        beforeCb();
        d.testCase();
      } catch (e) {
        if (e.type == 'ASSERTATION_ERROR') {
          failCount += 1;
          log('<b>FAILED</b>: ' + d.name + ' (' + e.context + ')');
        } else {
          errorCount += 1;
          log('<b>ERROR</b>: ' + d.name + ' (' + e + ')');
        }
      }
    });
    outputNode.appendChild(document.createElement('hr'));
    var summary = document.createElement('div');
    summary.classList.add('summary');
    var totalRunned = document.createElement('p');
    totalRunned.innerHTML = 'Tests runned: ' + cases.length;
    summary.appendChild(totalRunned);
    var errorsFails = document.createElement('p');
    errorsFails.innerHTML = 'Failed: ' + failCount + ' Errors: ' + errorCount;
    summary.appendChild(errorsFails);
    if (errorCount + failCount == 0) {
      var allPassed = document.createElement('h2');
      allPassed.innerHTML = 'All tests have passed!';
      allPassed.classList.add('all-passed');
      summary.appendChild(allPassed);
    }
    outputNode.appendChild(summary);
    document.body.appendChild(outputNode);
  };

  //Export
  window.beforeEach = beforeEach;
  window.assert = assert;
  window.assert.result = result;
  window.describe = describe;
  window.runTests = runTests;
  window.getResult = getResult;
})();

// ## Cases:
beforeEach(function () {
  return onReset();
});

describe('Init?', function () {
  assert.result.shouldBe(0);
});

describe('Numpad should work', function () {
  onNum(2);
  assert.equals(getResult(), 2);
  onNum(4);
  assert.equals(getResult(), 24);
  onNum(8);
  assert.equals(getResult(), 248);
});

describe('Zero zero zero!', function () {
  onNum(0);
  onNum(0);
  onNum(0);
  assert.result.shouldBe(0);
});

describe('Simple "add" test', function () {
  onNum(5);
  onPlus();
  onNum(3);
  onNum(7);
  onTotal();
  assert.result.shouldBe(42);
});

describe('Simple "mul" test', function () {
  onNum(3);
  onMultiply();
  onNum(7);
  onTotal();
  assert.result.shouldBe(21);
});

describe('Simple "sub" test', function () {
  onNum(3);
  onMinus();
  onNum(7);
  onTotal();
  assert.result.shouldBe(-4);
});

describe('Simple "div" test', function () {
  onNum(10);
  onDivide();
  onNum(2);
  onTotal();
  assert.result.shouldBe(5);
});

describe('Division by zero', function () {
  onNum(10);
  onDivide();
  onNum(0);
  onTotal();
  assert.result.shouldNotBe(0);
});

describe('Chained operations', function () {
  onNum(5);
  onPlus();
  onNum(5);
  onPlus();
  assert.result.shouldBe(10);
  onNum(5);
  assert.result.shouldBe(5);
  onTotal();
  assert.result.shouldBe(15);
});

describe('Operations overdose', function () {
  onNum(9);
  onDivide();
  onPlus();
  onMultiply();
  onMinus();
  onNum(4);
  onTotal();
  assert.result.shouldBe(5);
});

describe('Handle zero intermidiate result', function () {
  onNum(3);
  onMinus(3);
  onNum(3);
  onPlus();
  onNum(5);
  onTotal();
  assert.result.shouldBe(5);
});

describe('Complex one', function () {
  onNum(1);
  onPlus();
  onNum(1);
  onMultiply();
  onNum(5);
  onMinus(2);
  onNum(2);
  onTotal();
  assert.result.shouldBe(8);
});

runTests();