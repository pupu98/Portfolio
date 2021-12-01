//////////////////////////////////////////////////////////////////
//
//   JIAYI LAB 4
//

var gl;
var shaderProgram;
var draw_type = 2;
var shape_type = 6;
var object_mode = 0;
var render_mode = 0;
var shader_mode = 0;

// set up the parameters for lighting 

var light_pos = [1, 1, -1, 1];   // light position 
var light_ambient = [1.0, 0.75, 0.0, 1.0];
var light_diffuse = [1, 1, 1, 1];
var light_specular = [1, 1, 1, 1];

var mat_ambient = [0.15, 0.15, 0.15, 1];
var mat_diffuse = [0.8, 0.8, 0.8, 1];
var mat_specular = [.7, .7, .7, 1];
var mat_shine = [30];

//////////// Init OpenGL Context etc. ///////////////

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var squareVertexPositionBuffer;
    var squareVertexNormalBuffer;
    var squareVertexIndexBuffer;

    var tetraVertexPositionBuffer;
    var tetraVertexNormalBuffer;
    var tetraVertexIndexBuffer;

    var cylinderVertexPositionBuffer;
    var cylinderVertexNormalBuffer;
    var cylinderVertexIndexBuffer; 

    var coneVertexPositionBuffer;
    var coneVertexNormalBuffer;
    var coneVertexIndexBuffer;

    var sphereVertexPositionBuffer;
    var sphereVertexNormalBuffer;
    var sphereVertexIndexBuffer;


    var headVertexPositionBuffer;
    var headVertexNormalBuffer;
    var headVertexIndexBuffer;

////////////////    Initialize VBO  ////////////////////////
function pushIndices(indicies, i,j,nslices) {

    var mi = i % nslices;
    var mi2 = (i + 1) % nslices;

    var idx0 = (j + 1) * nslices + mi;
    var idx1 = j * nslices + mi; // mesh[j][mi] 
    var idx2 = (j) * nslices + mi2;
    var idx3 = (j + 1) * nslices + mi2;

    indicies.push(idx0);
    indicies.push(idx1);
    indicies.push(idx2);
    indicies.push(idx0);
    indicies.push(idx2);
    indicies.push(idx3);
}

function getVandI(shapeVertices, shapeIndices, numItems) {
    for (i = 0; i < numItems; i++) {
        shapeVertices.push(basicVertices[basicIndices[i] * 3]);
        shapeVertices.push(basicVertices[basicIndices[i] * 3 + 1]);
        shapeVertices.push(basicVertices[basicIndices[i] * 3 + 2]);
    }

    for (i = 0; i < numItems; i++) {
        shapeIndices.push(i);
    }
}

function getNormal(shapeVertices, shapeIndices, numTriangle, shapeNormals) {
    var normal = [];
    for (i = 0; i < numTriangle; i++) {
        var v1 = [];
        v1[0] = shapeVertices[shapeIndices[i * 3] * 3] - shapeVertices[shapeIndices[i * 3 + 1] * 3];
        v1[1] = shapeVertices[shapeIndices[i * 3] * 3 + 1] - shapeVertices[shapeIndices[i * 3 + 1] * 3 + 1];
        v1[2] = shapeVertices[shapeIndices[i * 3] * 3 + 2] - shapeVertices[shapeIndices[i * 3 + 1] * 3 + 2];
        var v2 = [];
        v2[0] = shapeVertices[shapeIndices[i * 3] * 3] - shapeVertices[shapeIndices[i * 3 + 2] * 3];
        v2[1] = shapeVertices[shapeIndices[i * 3] * 3 + 1] - shapeVertices[shapeIndices[i * 3 + 2] * 3 + 1];
        v2[2] = shapeVertices[shapeIndices[i * 3] * 3 + 2] - shapeVertices[shapeIndices[i * 3 + 2] * 3 + 2];

        vec3.cross(v1, v2, normal);

        normal = vec3.normalize(normal);

        for (j = 0; j < 3; j++) {
            shapeNormals.push(normal[0]);
            shapeNormals.push(normal[1]);
            shapeNormals.push(normal[2]);
        }
    }
}

////////////////////////////////////////////////////////////////
var sqVertices = [];
var sqNormals = [];
var sqIndices = [];


function InitSquare() {
    basicVertices = [
        0.5, 0.5, -.5,
        -0.5, 0.5, -.5,
        - 0.5, -0.5, -.5,
        0.5, -0.5, -.5,
        0.5, 0.5, .5,
        -0.5, 0.5, .5,
        -0.5, -0.5, .5,
        0.5, -0.5, .5,

    ];

   var basicNormals = [
        0.0, 0.0, -1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        -1.0, 0.0, 0.0,
        0.0, -1.0, 0.0
    ];

    basicIndices = [0, 1, 2, 0, 3, 2, 0, 3, 7, 0, 4, 7, 5, 1, 0, 5, 4, 0, 5, 6, 7, 5, 4, 7, 5, 1, 2, 5, 6, 2, 6, 2, 3, 6, 7, 3];

    getVandI(sqVertices, sqIndices, 36);

    for (i = 0; i < 6; i++) {
        for (j = 0; j < 6; j++) {
            sqNormals.push(basicNormals[i * 3]);
            sqNormals.push(basicNormals[i * 3 + 1]);
            sqNormals.push(basicNormals[i * 3 + 2]);
        }
    }
}


function initSQBuffers() {

    InitSquare();
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sqVertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 36;

    squareVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sqNormals), gl.STATIC_DRAW);
    squareVertexNormalBuffer.itemSize = 3;
    squareVertexNormalBuffer.numItems = 36;

    squareVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sqIndices), gl.STATIC_DRAW);
    squareVertexIndexBuffer.itemsize = 1;
    squareVertexIndexBuffer.numItems = 36;
    
}

//////////////////////////////////////////////////////
var tetraVertices = [];
var tetraNormals = [];
var tetraIndices = [];

function InitTetrahedron() {
    basicVertices = [
        0, 0, 0,
        0.5, 0, 0,
        0, 0.5, 0,
        0, 0, 0.5
    ];
    basicIndices = [0, 2, 1, 0, 3, 2, 0, 1, 3, 1, 2, 3];

    getVandI(tetraVertices, tetraIndices, 12);
    getNormal(tetraVertices, tetraIndices, 4, tetraNormals);
}


function initTetraBuffers() {

    InitTetrahedron();
    tetraVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tetraVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetraVertices), gl.STATIC_DRAW);
    tetraVertexPositionBuffer.itemSize = 3;
    tetraVertexPositionBuffer.numItems = 12;

    tetraVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tetraVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetraNormals), gl.STATIC_DRAW);
    tetraVertexNormalBuffer.itemSize = 3;
    tetraVertexNormalBuffer.numItems = 12;

    tetraVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tetraVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tetraIndices), gl.STATIC_DRAW);
    tetraVertexIndexBuffer.itemsize = 1;
    tetraVertexIndexBuffer.numItems = 12;
}
//////////////////////////////////////////////////////
var cyVertices = [];
var cyNormals = [];
var cyIndicies = [];

function InitCylinder(nslices, nstacks) 
{
  var nvertices = nslices * nstacks; 
    
  var Dangle = 2*Math.PI/(nslices-1); 

  for (j =0; j<nstacks; j++)
    for (i=0; i<nslices; i++) {
        var idx = j*nslices + i; // mesh[j][i] 
        var angle = Dangle * i; 
        cyVertices.push(Math.cos(angle));
        cyVertices.push(Math.sin(angle));
        cyVertices.push(j * 3.0 / (nstacks - 1) - 1.5);

        cyNormals.push(Math.cos(angle));
        cyNormals.push(Math.sin(angle));
        cyNormals.push(0.0);
    }
  // index array 
  nindices = (nstacks-1)*6*(nslices+1); 

  for (j =0; j<nstacks-1; j++)
    for (i=0; i<=nslices; i++) {
        pushIndices(cyIndicies, i, j, nslices);
    }
}

function initCYBuffers() {

        var nslices = 20;
        var nstacks = 50; 
        InitCylinder(nslices,nstacks);
    
        cylinderVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cyVertices), gl.STATIC_DRAW);
        cylinderVertexPositionBuffer.itemSize = 3;
        cylinderVertexPositionBuffer.numItems = nslices * nstacks;  

        cylinderVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cyNormals), gl.STATIC_DRAW);
        cylinderVertexNormalBuffer.itemSize = 3;
        cylinderVertexNormalBuffer.numItems = nslices * nstacks;

	    cylinderVertexIndexBuffer = gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderVertexIndexBuffer); 
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cyIndicies), gl.STATIC_DRAW);  
        cylinderVertexIndexBuffer.itemsize = 1;
        cylinderVertexIndexBuffer.numItems = (nstacks-1)*6*(nslices+1);    
}
//////////////////////////////////////////////////////////////////////////////
var coneVertices = [];
var coneNormals = [];
var coneIndicies = [];

function InitCone(nslices, nstacks) {
    var nvertices = nslices * nstacks;

    var Dangle = 2 * Math.PI / (nslices - 1);
    var height = 1.0;
    var s = 0.01;
    var radius = s * nstacks;
    for (j = 0; j < nstacks; j++)
        for (i = 0; i < nslices; i++) {
            var idx = j * nslices + i; // mesh[j][i] 
            var angle = Dangle * i;
            coneVertices.push(j * s * Math.cos(angle));
            coneVertices.push(j * s * Math.sin(angle));
            coneVertices.push(j * height / (nstacks - 1));

            var basicNormals = [];
            basicNormals[0] = radius * Math.cos(angle);
            basicNormals[1] =radius * Math.sin(angle);
            basicNormals[2] = -radius * radius / height;

            basicNormals = vec3.normalize(basicNormals);

            coneNormals.push(basicNormals[0]);
            coneNormals.push(basicNormals[1]);
            coneNormals.push(basicNormals[2]);

        }
    // index array 
    nindices = (nstacks - 1) * 6 * (nslices + 1);

    for (j = 0; j < nstacks - 1; j++)
        for (i = 0; i <= nslices; i++) {
            pushIndices(coneIndicies, i, j, nslices);
        }
}

function initConeBuffers() {

    var nslices = 20;
    var nstacks = 50;
    InitCone(nslices, nstacks);

    coneVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coneVertices), gl.STATIC_DRAW);
    coneVertexPositionBuffer.itemSize = 3;
    coneVertexPositionBuffer.numItems = nslices * nstacks;

    coneVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coneNormals), gl.STATIC_DRAW);
    coneVertexNormalBuffer.itemSize = 3;
    coneVertexNormalBuffer.numItems = nslices * nstacks;

    coneVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(coneIndicies), gl.STATIC_DRAW);
    coneVertexIndexBuffer.itemsize = 1;
    coneVertexIndexBuffer.numItems = (nstacks - 1) * 6 * (nslices + 1);
}
//////////////////////////////////////////////////////////////////////////////
var sphereVertices = [];
var sphereNormals = [];
var sphereIndicies = [];

function InitSphere(nslices, nstacks) {
    var nvertices = nslices * nstacks;

    var Dtheta = Math.PI / (nslices - 1);
    var Dphi = 2 * Math.PI / (nstacks - 1);
    for (j = 0; j < nstacks; j++)
        for (i = 0; i < nslices; i++) {
            var idx = j * nslices + i; // mesh[j][i] 
            var theta = Dtheta * i;
            var phi = Dphi * j;
            sphereVertices .push(Math.sin(theta) * Math.cos(phi));
            sphereVertices .push(Math.sin(theta) * Math.sin(phi));
            sphereVertices.push(Math.cos(theta));

            sphereNormals.push(Math.sin(theta) * Math.cos(phi));
            sphereNormals.push(Math.sin(theta) * Math.sin(phi));
            sphereNormals.push(Math.cos(theta)); 
        }
    // index array 
    nindices = (nstacks - 1) * 6 * (nslices + 1);

    for (j = 0; j < nstacks - 1; j++)
        for (i = 0; i <= nslices; i++) {
            pushIndices(sphereIndicies, i, j, nslices)
        }
}

function initSPBuffers() {

    var nslices = 20;
    var nstacks = 50;
    InitSphere(nslices, nstacks);

    sphereVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertices ), gl.STATIC_DRAW);
    sphereVertexPositionBuffer.itemSize = 3;
    sphereVertexPositionBuffer.numItems = nslices * nstacks;

    sphereVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereNormals), gl.STATIC_DRAW);
    sphereVertexNormalBuffer.itemSize = 3;
    sphereVertexNormalBuffer.numItems = nslices * nstacks;

    sphereVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereIndicies), gl.STATIC_DRAW);
    sphereVertexIndexBuffer.itemsize = 1;
    sphereVertexIndexBuffer.numItems = (nstacks - 1) * 6 * (nslices + 1);
}
///////////////////////////////////////////////////////
var headVertices = [];
var headNormals = [];
var headIndices = [];

function InitHead() {

   
    basicVertices = [
        0, 0.01, 0.02,                //0
        0.15, 0.10, 0,          //1
        -0.15, 0.10, 0,
        0.12, -0.03, 0.03,      //3
        -0.12, -0.03, 0.03,
        0.07, 0, 0.08,          //5
        -0.07, 0, 0.08,
        0.07, 0, 0,             //7
        -0.07, 0, 0,
        0.12, -0.05, 0,         //9
        -0.12, -0.05, 0,
        0.12, -0.07, 0,         //11
        -0.12, -0.07, 0,
        0.07, -0.12, 0,         //13
        -0.07, -0.12, 0,
        0.05, -0.05, -0.06,     //15
        -0.05, -0.05, -0.06,
        0.03, -0.07, -0.05,     //17
        -0.03, -0.07, -0.05,
        0.01, -0.13, -0.12,     //19
        -0.01, -0.13, -0.12,
        0, -0.15, -0.11,         //21

        //back
        0.09, -0.04, 0.06,      //22
        -0.09, -0.04, 0.06,
        0.11, -0.07, 0.06,      //24
        -0.11, -0.07, 0.06,
        0.05, -0.07, 0.09,      //26
        -0.05, -0.07, 0.09,
        0.06, -0.12, 0.06,      //28
        -0.06, -0.12, 0.06,

    ];
   
    basicIndices = [
        //Ear(8)
        0, 5, 1,
        1, 5, 3,
        0, 5, 7,
        3, 7, 5,
        0, 2, 6,
        2, 4, 6,
        4, 6, 8,
        0, 6, 8,

        //Nose(8)
        0, 7, 8,
        7, 16, 8,
        7, 15, 16,
        15, 18, 16,
        15, 17, 18,
        17, 20, 18,
        17, 19, 20,
        19, 21, 20,

        //Right Face(7)
        4, 8, 10,
        8, 16, 10,
        10, 16, 12,
        12, 16, 18,
        12, 18, 14,
        14, 18, 20,
        14, 20, 21,

        //Left Face(7)
        3, 9, 7,
        7, 9, 15,
        9, 11, 15,
        11, 17, 15,
        11, 13, 17,
        13, 19, 17,
        13, 21, 19,

        //back1 (5)
        0, 6, 5,
        5, 6, 27,
        5, 27, 26,
        26, 27, 28,
        27, 29, 28,

        //back2 (18)
        3, 5, 22,
        4, 23, 6,
        5, 26, 22,
        6, 23, 27,
        3, 22, 24,
        4, 25, 23,
        22, 26, 24,
        23, 25, 27,
        3, 24, 11,
        4, 12, 25,
        3, 11, 9,
        4, 10, 12,
        11, 28, 13,
        12, 14, 29,
        11, 24, 28,
        12, 29, 25,
        24, 26, 28,
        25, 29, 27,
    ];

    getVandI(headVertices, headIndices, 159);
    getNormal(headVertices, headIndices, 53, headNormals);  
}



function initHeadBuffers() {

    InitHead();

    headVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headVertices), gl.STATIC_DRAW);
    headVertexPositionBuffer.itemSize = 3;
    headVertexPositionBuffer.numVertices = (8 + 8 + 7 + 7 + 5 + 18) * 3; //n+1


    headVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headNormals), gl.STATIC_DRAW);
    headVertexNormalBuffer.itemSize = 3;
    headVertexNormalBuffer.numItems = (8 + 8 + 7 + 7 + 5 + 18) * 3;

    headVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, headVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(headIndices), gl.STATIC_DRAW);
    headVertexIndexBuffer.itemsize = 1;
    headVertexIndexBuffer.numItems = (8 + 8 + 7 + 7 + 5 + 18) * 3;   //53*3 indices, 3 per triangle, so 53 triangles
}
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    var mMatrix = mat4.create();  // model matrix
    var vMatrix = mat4.create(); // view matrix
    var pMatrix = mat4.create();  //projection matrix
    var nMatrix = mat4.create();  //normal matrix

    var vmMatrix = mat4.create(); //store information of model 

    var eyePos = [0, 0, -4];
    var COI = [0, 0, 0];
    var viewUp = [0, 1, 0];

    var Z_angle = 0;

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);

    gl.uniform4f(shaderProgram.light_posUniform, light_pos[0], light_pos[1], light_pos[2], light_pos[3]);
    gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0);
    gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
    gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2], 1.0);
    gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]);

    gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0);
    gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0);
    gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2], 1.0);

    gl.uniform1i(shaderProgram.object_modeUniform, object_mode);
    gl.uniform1i(shaderProgram.render_modeUniform, render_mode);
}

function setnMatrix() {
    mat4.identity(nMatrix);
    nMatrix = mat4.multiply(nMatrix, vMatrix);      //Mv
    nMatrix = mat4.multiply(nMatrix, mMatrix);      //Mv * Mm
    nMatrix = mat4.inverse(nMatrix);                //(Mv * Mm)^(-1)
    nMatrix = mat4.transpose(nMatrix);              //((Mv * Mm)^(-1))^(T)
}

function bindBuffer(shapeVertexPositionBuffer, shapeVertexNormalBuffer, shapeVertexIndexBuffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, shapeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, shapeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeVertexIndexBuffer);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
///////


function drawCylinder() {
    setnMatrix();
    bindBuffer(cylinderVertexPositionBuffer, cylinderVertexNormalBuffer, cylinderVertexIndexBuffer);
    setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 

    if (draw_type == 1) gl.drawArrays(gl.LINE_LOOP, 0, cylinderVertexPositionBuffer.numItems);
    else if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, cylinderVertexPositionBuffer.numItems);
    else if (draw_type == 2) gl.drawElements(gl.TRIANGLES, cylinderVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawCone() {
    setnMatrix();
    bindBuffer(coneVertexPositionBuffer, coneVertexNormalBuffer, coneVertexIndexBuffer);
    setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 

    if (draw_type == 1) gl.drawArrays(gl.LINE_LOOP, 0, coneVertexPositionBuffer.numItems);
    else if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, coneVertexPositionBuffer.numItems);
    else if (draw_type == 2) gl.drawElements(gl.TRIANGLES, coneVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawSphere() {
    setnMatrix();
    bindBuffer(sphereVertexPositionBuffer, sphereVertexNormalBuffer, sphereVertexIndexBuffer);
    setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 

    if (draw_type == 1) gl.drawElements(gl.LINES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, sphereVertexPositionBuffer.numItems);
    else if (draw_type == 2) gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
function drawSquare() {
    setnMatrix();
    bindBuffer(squareVertexPositionBuffer, squareVertexNormalBuffer, squareVertexIndexBuffer);
    setMatrixUniforms();

    if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, squareVertexPositionBuffer.numItems);
    else if (draw_type == 1) gl.drawElements(gl.LINE_LOOP, squareVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else if (draw_type == 2) gl.drawElements(gl.TRIANGLES, squareVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawTetrahedron() {
    setnMatrix();
    bindBuffer(tetraVertexPositionBuffer, tetraVertexNormalBuffer, tetraVertexIndexBuffer);
    setMatrixUniforms();

    if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, tetraVertexPositionBuffer.numItems);
    else if (draw_type == 1) gl.drawElements(gl.LINE_LOOP, tetraVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else if (draw_type == 2) gl.drawElements(gl.TRIANGLES, tetraVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawHead() {
    setnMatrix();
    bindBuffer(headVertexPositionBuffer, headVertexNormalBuffer, headVertexIndexBuffer);
    setMatrixUniforms();

    if (draw_type == 2) gl.drawElements(gl.TRIANGLES, headVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else if (draw_type == 1) gl.drawElements(gl.LINE_LOOP, headVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else if (draw_type == 0) gl.drawArrays(gl.POINTS, 0, headVertexPositionBuffer.numVertices);
}
///////////////////////////////////////////////////////////////
function pushMatrix(stack, m) {
    var copy = mat4.create(m);  //necessary because javascript only does shallow push 
    stack.push(copy);
}

function popMatrix(stack) {
    return (stack.pop());
}
 ///////////////////////////////////////////////////////////////

function drawScene() {
    var matrixStack = [];
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    object_mode = 0;
    light_diffuse = [1.0, 0.65, 0.0, 1.0];

    pMatrix = mat4.perspective(60, 1.0, 0.1, 100, pMatrix);  // set up the projection matrix 

    vMatrix = mat4.lookAt(eyePos, COI, viewUp, vMatrix);// set up the view matrix, multiply into the modelview matrix

    mat4.identity(mMatrix);

    mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 1, 0]);   // now set up the model matrix
    mMatrix = mat4.multiply(mMatrix, vmMatrix);

    if (shape_type == 0) {
        drawSquare();
    } else if (shape_type == 1) {
        drawTetrahedron();
    } else if (shape_type == 2) {
        drawCylinder();
    } else if (shape_type == 3) {
        drawCone();
    } else if (shape_type == 4) {
        drawSphere();
    } else if (shape_type == 5) {
        drawHead();
    }else if (shape_type == 6) {
        pushMatrix(matrixStack, mMatrix);
        pushMatrix(matrixStack, mMatrix);
        pushMatrix(matrixStack, mMatrix);
        pushMatrix(matrixStack, mMatrix);
        pushMatrix(matrixStack, mMatrix);

        //draw tail part1
        light_diffuse = [1.0, 0.75, 0.0, 1.0];
        mMatrix = mat4.translate(mMatrix, [0, -1.2, 0.2]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree2), [0, 0.5, 1]);
        mMatrix = mat4.scale(mMatrix, [0.7, 0.7, 0.5]);
        mMatrix = mat4.translate(mMatrix, [0, 0, 0.2]);

        drawCone();
        mMatrix = mat4.translate(mMatrix, [0, 0, 2]);
        mMatrix = mat4.rotate(mMatrix, degToRad(180), [0, -1, 0]);
        drawCone();

        //then draw tail part2
        mMatrix = mat4.translate(mMatrix, [0, 0, 0.5]);
        mMatrix = mat4.rotate(mMatrix, degToRad(180), [0, -1, 0]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree3), [0, 1, -1]);
        mMatrix = mat4.translate(mMatrix, [0, 0, -0.5]);

        drawCone();
        mMatrix = mat4.translate(mMatrix, [0, 0, 2]);
        mMatrix = mat4.rotate(mMatrix, degToRad(180), [0, -1, 0]);
        drawCone();
       
        //draw body
        mMatrix = popMatrix(matrixStack);
        light_diffuse = [1.0, 0.65, 0.0, 1.0]; //orange
        mMatrix = mat4.translate(mMatrix, [0.0, -0.3, 0.1]);
        mMatrix = mat4.rotate(mMatrix, degToRad(180), [0, -1, 1]);
        mMatrix = mat4.scale(mMatrix, [0.6, 0.6, 1]);
        drawCone();

        //draw one arm
        mMatrix = popMatrix(matrixStack);
        light_diffuse = [1.0, 0.45, 0.0, 1.0];
        mMatrix = mat4.translate(mMatrix, [0.14, -1, -0.1]);

        mMatrix = mat4.rotate(mMatrix, degToRad(-60), [1, 0, 0]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree5), [0, -1, 1]);
        mMatrix = mat4.scale(mMatrix, [0.07, 0.07, 0.1]);
        mMatrix = mat4.translate(mMatrix, [0, 0, -1.2]);
        drawCylinder();

        light_diffuse = [1.0, 1.0, 1.0, 1.0];

        mMatrix = mat4.translate(mMatrix, [0, 0.4, -1.5]);
        mMatrix = mat4.rotate(mMatrix, degToRad(90), [0, 0, 1]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree7), [0, 0, 1]);
        mMatrix = mat4.scale(mMatrix, [2, 2.5, 0.5]);
        drawSquare();

        //draw another arm
        mMatrix = popMatrix(matrixStack);
        light_diffuse = [1.0, 0.45, 0.0, 1.0];
        mMatrix = mat4.translate(mMatrix, [-0.14, -1, -0.1]);

        mMatrix = mat4.rotate(mMatrix, degToRad(-60), [1, 0, 0]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree6), [0, -1, 1]);
        mMatrix = mat4.scale(mMatrix, [0.07, 0.07, 0.1]);
        mMatrix = mat4.translate(mMatrix, [0, 0, -1.2]);
        drawCylinder();

        light_diffuse = [1.0, 1.0, 1.0, 1.0];

        mMatrix = mat4.translate(mMatrix, [0, 0.4, -1.5]);
        mMatrix = mat4.rotate(mMatrix, degToRad(90), [0, 0, 1]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree8), [0, 0, 1]);
        mMatrix = mat4.scale(mMatrix, [2, 2.5, 0.5]);
        drawSquare();

        //draw neck then head
        mMatrix = popMatrix(matrixStack);
        light_diffuse = [1.0, 1.0, 1.0, 1.0];
        mMatrix = mat4.translate(mMatrix, [0.0, -0.45, 0.07]);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree1), [0, 0, -1]);
        mMatrix = mat4.scale(mMatrix, [0.25, 0.25, 0.25]);
        drawSquare();
        light_diffuse = [1.0, 0.65, 0.0, 1.0];
        mMatrix = popMatrix(matrixStack);
        mMatrix = mat4.rotate(mMatrix, degToRad(degree4), [0, 0, -1]);
        mMatrix = mat4.scale(mMatrix, [3, 3, 3]);
        drawHead();
    }

    object_mode = 1;
    mat4.identity(mMatrix);
    mMatrix = mat4.translate(mMatrix, light_pos);
    mMatrix = mat4.scale(mMatrix, [0.1, 0.1, 0.1]);

    drawSphere();
}

    ///////////////////////////////////////////////////////////////

     var lastMouseX = 0, lastMouseY = 0;

    ///////////////////////////////////////////////////////////////

     function onDocumentMouseDown( event ) {
          event.preventDefault();
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.addEventListener( 'mouseup', onDocumentMouseUp, false );
          document.addEventListener( 'mouseout', onDocumentMouseOut, false );
          var mouseX = event.clientX;
          var mouseY = event.clientY;

          lastMouseX = mouseX;
          lastMouseY = mouseY; 

      }

     function onDocumentMouseMove( event ) {
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;

          Z_angle = Z_angle + diffX/5;

          lastMouseX = mouseX;
          lastMouseY = mouseY;

          drawScene();
     }

     function onDocumentMouseUp( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

     function onDocumentMouseOut( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

////////////////////////////////////////////////////////////
    function webGLStart() {
        var canvas = document.getElementById("code03-canvas");
        initGL(canvas);
        initShaders(shader_mode);

	    gl.enable(gl.DEPTH_TEST); 

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
      
        shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

        shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
        shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");
        shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
        shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
        shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");

        shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");
        shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
        shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");

        shaderProgram.object_modeUniform = gl.getUniformLocation(shaderProgram, "object_mode");
        shaderProgram.render_modeUniform = gl.getUniformLocation(shaderProgram, "render_mode");

        initSQBuffers();
        initTetraBuffers();
        initCYBuffers(); 
        initConeBuffers();
        initSPBuffers();
        initHeadBuffers();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);

        mat4.identity(vmMatrix);
       
        drawScene();
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {
    Z_angle = 0;

    degree1 = 0;
    degree2 = 0;
    degree3 = 0;
    degree4 = 0;
    degree5 = 0;
    degree6 = 0;
    degree7 = 0;
    degree8 = 0;
    direction1 = true;
    direction2 = true;
    degree9 = 0;

    eyePos = [0, 0, -4];
    COI = [0, 0, 0];
    viewUp = [0, 1, 0];

    mat4.identity(vmMatrix);

    drawScene();
}
    
function geometry(type) {
    draw_type = type;
    drawScene();
}

function shape(shape) {
    shape_type = shape;
    redraw();
}

var degree1 = 0;
var degree2 = 0;
var degree3 = 0;
var degree4 = 0;
var degree5 = 0;
var degree6 = 0;
var degree7 = 0;
var degree8 = 0;
var direction1 = true;
var direction2 = true;
var degree9 = 0;
///////////////////////////////////////////////////////////////////////////
//
//  key stroke handler 
//
function onKeyDown(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 65:
            if (event.shiftKey) {
                console.log('enter A');
                render_mode = 1;
            }
            else {
                console.log('enter a');
                render_mode = 1;
            }
            break;
        case 66:
            if (event.shiftKey) {
                console.log('enter B');
                render_mode = 2;
            }
            else {
                console.log('enter b');
                render_mode = 2;
            }
            break;
        case 87:
            if (event.shiftKey) {
                console.log('enter W');
                render_mode = 0;
            }
            else {
                console.log('enter w');
                render_mode = 0;
            }
            break;
        case 71:
            if (event.shiftKey) {
                console.log('enter G');
                light_pos[0] += 0.1;
            }
            else {
                console.log('enter g');
                light_pos[0] -= 0.1;
            }
            break;
        case 72:
            if (event.shiftKey) {
                console.log('enter H');
                light_pos[1] += 0.1;
            }
            else {
                console.log('enter h');
                light_pos[1] -= 0.1;
            }
            break;
        case 74:
            if (event.shiftKey) {
                console.log('enter J');
                light_pos[2] += 0.1;
            }
            else {
                console.log('enter j');
                light_pos[2] -= 0.1;
            }
            break;
        case 82:
            if (event.shiftKey) {
                console.log('enter R');
                vmMatrix = mat4.rotate(vmMatrix, degToRad(5.0), [0, 0, 1]);
            }
            else {
                console.log('enter r');
                degree2 += 10;
            }
            break;
        case 69:
            console.log('enter e');
            if (degree3 >= 40) {
                direction2 = false;
            } else if (degree3 <= -40) {
                direction2 = true;
            }
            if (direction2) {
                degree3 += 10;
            } else {
                degree3 -= 10;
            }
            break;
        case 81:
            console.log('enter q');
            if (degree1 >= 3.5) {
                direction1 = false;
            } else if (degree1 <= -3.5) {
                direction1 = true;
            }
            if (direction1) {
                degree1 += 0.5;
                degree4 += 1;
            } else {
                degree1 -= 0.5;
                degree4 -= 1;
            }
            break;
        case 88:
            if (event.shiftKey) {
                console.log('enter X');
                vmMatrix = mat4.translate(vmMatrix, [0.1, 0, 0]);
            }
            else {
                vmMatrix = mat4.translate(vmMatrix, [-0.1, 0, 0]);
            }
            break;
        case 89:
            if (event.shiftKey) {
                console.log('enter Y');
                vmMatrix = mat4.translate(vmMatrix, [0.0, 0.1, 0]);
            }
            else {
                console.log('enter y');
                vmMatrix = mat4.translate(vmMatrix, [0.0, -0.1, 0]);
            }
            break;
        case 90:
            if (event.shiftKey) {
                console.log('enter Z');
                vmMatrix = mat4.translate(vmMatrix, [0.0, 0, 0.1]);
            }
            else {
                console.log('enter z');
                vmMatrix = mat4.translate(vmMatrix, [0.0, 0, -0.1]);
            }
            break;
        case 83:
            if (event.shiftKey) {
                console.log('enter S');
                vmMatrix = mat4.scale(vmMatrix, [1.05, 1.05, 1.05]);
            }
            else {
                console.log('enter s');
                vmMatrix = mat4.scale(vmMatrix, [0.95, 0.95, 0.95]);
            }
            break;
        case 80:
            if (event.shiftKey) {
                console.log('enter P');
                degree6 += 10;
            }
            else {
                console.log('enter p');
                degree6 -= 10;
            }
            break;
        case 79:
            if (event.shiftKey) {
                console.log('enter O');
                degree5 += 10;
            }
            else {
                console.log('enter o');
                degree5 -= 10;
            }
            break;
        case 75:
            if (event.shiftKey) {
                console.log('enter K');
                if (degree7 <= 30) degree7 += 5;
            }
            else {
                console.log('enter k');
                if (degree7 >= -30) degree7 -= 5;
            }
            break;
        case 76:
            if (event.shiftKey) {
                console.log('enter L');
                if (degree8 <= 30) degree8 += 5;
            }
            else {
                console.log('enter l');
                if (degree8 >= -30) degree8 -= 5;
            }
            break;
        case 86:
            if (event.shiftKey) {
                console.log('enter V');
                eyePos[0] += 0.1;
                COI[0] += 0.1;
            }
            else {
                console.log('enter v');
                eyePos[0] -= 0.1;
                COI[0] -= 0.1;
            }
            break;
        case 68:
            if (event.shiftKey) {
                console.log('enter D');
                eyePos[1] += 0.1;
                COI[1] += 0.1;
            }
            else {
                console.log('enter d');
                eyePos[1] -= 0.1;
                COI[1] -= 0.1;
            }
            break;
        case 78:
            if (event.shiftKey) {
                console.log('enter N');
                eyePos[2] += 0.1;
                COI[2] += 0.1;
            }
            else {
                console.log('enter n');
                eyePos[2] -= 0.1;
                COI[2] -= 0.1;
            }
            break;
        case 77:
            if (event.shiftKey) {
                console.log('enter M');
                viewUp[0] += 0.1;
            }
            else {
                console.log('enter m');
                viewUp[0] -= 0.1;
            }
            break;
        case 67:
            if (event.shiftKey) {
                console.log('enter C');
                COI[1]+=0.1;
            }
            else {
                console.log('enter c');
                COI[1] -= 0.1;
            }
            break;
        case 84:
            if (event.shiftKey) {
                console.log('enter T');
                COI[0] += 0.1;
            }
            else {
                console.log('enter t');
                COI[0] -= 0.1;
            }
            break;
        case 85:
            if (event.shiftKey) {
                console.log('enter U');
                shader_mode = 0;
            }
            else {
                console.log('enter u');
                shader_mode = 1;                
            }
            webGLStart();
            break;
    }
    drawScene();	 // draw the VBO 
}