/*
	A clone of Particles Web Matrix by Kushagra Agarwal
    Copyright (C) 2014  Anton Rufino

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var canvas, ctx;
var mx, my;
var prevMX, prevMY
var mousedown = false;
var Draw;

function Engine()
{
	this.color = '#fff';
	this.background = '#000';
	
	this.lineWidth = 1;
	this.lineCap = 'round';
	
	this.eraser = false;
	
	this.clear = function()
	{
		ctx.fillStyle = this.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	this.init = function() 
	{
		setUpCanvas();
		
		ctx.fillStyle = this.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		canvas.addEventListener('mousemove', mouseMoveHandler, false);
		canvas.addEventListener('mousedown', mouseDownHandler, false);
		canvas.addEventListener('mouseup', mouseUpHandler, false);
		
		window.addEventListener('resize', resizeHandler, false);
	}
}

function draw()
{
	if (mousedown) {
		ctx.lineJoin = 'round';
		
		ctx.beginPath();
		
		if (Draw.eraser) {
			ctx.strokeStyle = Draw.background;
			ctx.lineWidth = 10;
		}
		else {
			ctx.strokeStyle = Draw.color;
			ctx.lineWidth = Draw.lineWidth;
		}
		
		ctx.lineCap = Draw.lineCap;
		ctx.moveTo(prevMX, prevMY);
		ctx.lineTo(mx, my);
		ctx.closePath();
		ctx.stroke();
		
		prevMX = mx;
		prevMY = my;
	}
}

function mouseMoveHandler(e)
{
	e.preventDefault();
	
	mx = e.clientX;
	my = e.clientY;
	
	draw();
}
	
function mouseDownHandler(e)
{
	e.preventDefault();
	
	prevMX = mx - 1;
	prevMY = my;
	
	mousedown = true;
	
	draw()
}
	
function mouseUpHandler(e)
{
	e.preventDefault();
	mousedown = false;
}

function resizeHandler()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	Draw.clear();
}
	
function setUpCanvas() 
{
	canvas = document.getElementById('feild');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	}
}

function setGUI()
{
	var gui = new dat.GUI();
	
	gui.addColor(Draw, 'color');
	gui.addColor(Draw, 'background').onChange(function(value)
	{
		Draw.clear()
	});
	gui.add(Draw, 'lineWidth', 1, 20);
	gui.add(Draw, 'eraser');
	gui.add(Draw, 'clear');
}

window.addEventListener('load', function() 
{
	Draw = new Engine();
	Draw.init();
	
	setGUI();
}, false);