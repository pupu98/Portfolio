# Curve Interpolation
-----
## Table of Contents
- [About the Project](#about-the-project)
- [How to Operate](#how-to-operate)

## About the Project
Cubic interpolations are used so that the cube moves through the points in a curved pattern.

You have two choices of different patterns:
```
CatmullRomCurveInterpolation.cs
```
```
BezierCurves.cs
```
Initially, the object is created by moving at a constant velocity, reparameterizing by arc length (when distanceInc = time in the update function).

Then, EaseInAndOut function makes the cube slowly start from point, and down slow to end point.

Additional feature is that we made the object rotate to face forward in the direction it is moving.

## How to Operate
1. Create a new 3D unity project
2. Click "Assets -> Import Package" to add package to your project.
3. Double click "lab5" screen, and run it.
4. If you want to use different curve, just delete previous in GameObject, and than add script you wanted.



 

