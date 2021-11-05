# Curve Interpolation
-----
## Table of Contents
* [About the Project] (* About the Project)
* [How to Operate] (* How to Operate)
* [Background] (* Background)

## About the Project
## How to Operate
## Background
1. Cubic interpolation is used so that the cube moves through the points in a curved pattern.

Catmull-Rom Splines: CatmullRomCurveInterpolation.cs
Bezier curves using the de Casteljau algorithm:  
Initially, it moved at a constant velocity, reparameterizing by arc length (when distanceInc = time in the update function).

Then, EaseInAndOut function makes the cube slow down when getting to the last point, and start slow from there.
	NOTE: it eases in and out of the last point instead of the inial point.


Additional feature is that we made the object rotate to face forward in the direction it is moving.
