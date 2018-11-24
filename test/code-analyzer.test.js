import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '[]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a function declaration', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){}')),
            '[{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let x;')),
            '[{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":null}]'
        );
    });
});


describe('The javascript parser', () => {
    it('is parsing a simple assignment expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":1}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a complex assignment expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('mid = (low + high)/2;')),
            '[{"Line":1,"Type":"assignment expression","Name":"mid","Condition":"","Value":"low+high/2"}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a member assignment expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('V[i] = 1')),
            '[{"Line":1,"Type":"assignment expression","Name":"V[i]","Condition":"","Value":1}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a member in the prop assignment expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('V[i+1] = 2')),
            '[{"Line":1,"Type":"assignment expression","Name":"V[i+1]","Condition":"","Value":2}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a while statment', () => {
        assert.equal(
            JSON.stringify(parseCode(' while (low <= high) {}')),
            '[{"Line":1,"Type":"while statement","Name":"","Condition":"low<=high","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a if statment', () => {
        assert.equal(
            JSON.stringify(parseCode(' if (X < V[mid]) {}')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"X<V[mid]","Value":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a for statment', () => {
        assert.equal(
            JSON.stringify(parseCode('for (let i =0; i<10; i++) {}')),
            '[{"Line":1,"Type":"variable declaration","Name":"i","Condition":"","Value":0},{"Line":1,"Type":"Update Expression","Name":"i++","Condition":"","Value":""},{"Line":1,"Type":"for statement","Name":"","Condition":"i<10","Value":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a return statment', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X) { return -1; }')),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"-1"},{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a member return statment', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X) { return X[0]; }')),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"X[0]"},{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a update statment', () => {
        assert.equal(
            JSON.stringify(parseCode('++x')),
            '[{"Line":1,"Type":"Update Expression","Name":"++x","Condition":"","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a logical statment', () => {
        assert.equal(
            JSON.stringify(parseCode('if( x==2&& x==3) {}')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"x==2&&x==3","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a while true', () => {
        assert.equal(
            JSON.stringify(parseCode('while (true) {}')),
            '[{"Line":1,"Type":"while statement","Name":"","Condition":true,"Value":""}]'
        );
    });
});



