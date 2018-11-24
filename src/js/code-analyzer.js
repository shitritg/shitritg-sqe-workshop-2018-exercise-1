import * as esprima from 'esprima';


let parsedarr = [];
const parseCode = (codeToParse) => {
    let parsedCode =esprima.parseScript(codeToParse,{loc: true}, function(node,metadata){
        if (node.type == 'FunctionDeclaration')
            FunctionDeclarationParse(node, metadata);
        else if (node.type == 'VariableDeclarator')
            VariableDeclaratorParse(node,metadata);
        else  if(node.type == 'AssignmentExpression')
            AssignmentExpressionParse(node, metadata);
        else
            ParserCont(node,metadata);
    });   // console.log(parsedarr);
    // parsedCode = parsedarr.toString();
    //parsedCode =  JSON.stringify(parsedarr);
    //console.log(parsedCode);
    parsedCode = parsedarr;
    parsedarr = [];
    return parsedCode;
};


function ParserCont(node,metadata) {
    if(node.type == 'WhileStatement' || node.type == 'IfStatement' || node.type=='ForStatement')
        WhileIfStatementParse(node, metadata);
    else  if(node.type == 'ReturnStatement')
    {
        let val = TypeOf(node.argument);
        parsedarr.push({ Line: metadata.start.line, Type: 'return statement', Name: '' ,Condition:'', Value:val });
    }
    else
        ParseNextCont(node, metadata);
}


function ParseNextCont(node, metadata) {
    if(node.type == 'UpdateExpression')
    {
        let arg = TypeOf(node.argument);
        if(!node.prefix)
            arg += node.operator;
        else
            arg = node.operator + arg;
        parsedarr.push({ Line: metadata.start.line, Type: 'Update Expression', Name: arg ,Condition:'', Value:'' });
    }
    return;
}


// function BinaryExp(node)
// {
//     let right = '';
//     while (node.type == 'BinaryExpression')
//     {
//         // if(node.right.type == 'Identifier')
//         right= TypeOf(node.right) + right;
//         // else
//         //    right = node.right.value + right
//         right = node.operator + right;
//         // if(node.left == null)
//         //     break;
//         node = node.left;
//     }
//     //  if (node.type == 'Identifier')
//     right = TypeOf(node) + right;
//     //  else
//     //    right = node.value + right;
//     return right;
// }

function Recursive(node)
{
    if(node.left==null && node.right==null)
    {
        return TypeOf(node);
    }
    else if (node.left!= null && node.right!=null)
    {
        return Recursive(node.left )+ node.operator + Recursive(node.right);
    }
}

// function LogicalExp(node)
// {
//     let right = '';
//     let total = '';
//     while (node.type == 'LogicalExpression')
//     {
//         // if(node.right.type == 'Identifier')
//         let check = TypeOf(node.right);
//         if (check== 'empty')
//         {
//             let curr = node;
//             // node = node.right;
//             right = BinaryExp(node.right);
//             node = curr;
//         }
//         // else
//         //    right = node.right.value + right
//         total =   node.operator + right + total;
//         // if(node.left == null)
//         //     break;
//         node = node.left;
//     }
//     //  if (node.type == 'Identifier')
//     let temp = BinaryExp(node);
//     if (temp== 'empty')
//     {
//         let curr = node;
//         node = node.right;
//         temp = BinaryExp(node);
//         node = curr;
//     }
//     total =  temp + total;
//     //  else
//     //    right = node.value + right;
//     return total;
// }
function TypeOf(node) {
    if (node.type == 'MemberExpression')
    {
        let prop = '';
        if (node.property.type == 'Identifier')
            prop = node.property.name;
        else if (node.property.type == 'Literal')
            prop = node.property.value;
        else if (node.property.type == 'BinaryExpression')
        {
            // let curr = node;
            prop = Recursive(node.property);
        }
        let res = node.object.name;
        return res  + '[' + prop + ']';
    }
    else
        return TypeOfNotMemberExpression(node);

}

function TypeOfNotMemberExpression(node) {
    if (node.type == 'Literal')
        return node.value;
    else if (node.type == 'Identifier')
        return node.name;
    else if (node.type == 'UnaryExpression')
        return node.operator + node.argument.value;
    // else if(node.type=='LogicalExpression')
    //     return 'log';
    return 'empty';
}


function FunctionDeclarationParse(node, metadata) {
    parsedarr.push({ Line: metadata.start.line, Type: node.type, Name: node.id.name ,Condition:'', Value: ''});
    for(let i=0; i<node.params.length; i++)
    {
        parsedarr.push({ Line: metadata.start.line, Type: 'variable declaration', Name: node.params[i].name ,Condition:'', Value: ''});
    }
}

function VariableDeclaratorParse(node,metadata) {
    let initVal=null;
    if(node.init!=null)///////delete
        initVal=node.init.value;
    parsedarr.push({ Line: metadata.start.line, Type: 'variable declaration', Name: node.id.name ,Condition:'', Value:initVal });
}

function AssignmentExpressionParse(node, metadata)
{
    let right =TypeOf(node.right);
    let left = TypeOf(node.left);
    if (right== 'empty')
    {
        // let curr = node;
        //node = node.right;
        right = Recursive(node.right);
        //  node = curr;
    }
    parsedarr.push({ Line: metadata.start.line, Type: 'assignment expression', Name: left ,Condition:'', Value:right });
}

function WhileIfStatementParse(node, metadata) {
    let cond = '';
    let type = 'while statement';
    if (node.type == 'IfStatement')
        type = 'if statement';
    else if(node.type == 'ForStatement')
        type = 'for statement';
    if(node.test.type== 'BinaryExpression' || node.test.type== 'LogicalExpression')
    {
        //  let curr = node;
        cond = Recursive(node.test);
        //   node = curr;
    }
    parsedarr.push({ Line: metadata.start.line, Type: type, Name: '' ,Condition:cond, Value:'' });
}

export {parseCode};


