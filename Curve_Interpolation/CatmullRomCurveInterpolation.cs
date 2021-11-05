using UnityEngine;
using System.Collections;

public class CatmullRomCurveInterpolation : MonoBehaviour
{
    const int NumberOfPoints = 8;
    Vector3[] controlPoints;
    GameObject Player;
    public Vector3 position;
    public double velocityMag;
    public double[] normSegLens;
    public double[] cumSegLens;

    const int MinX = -5;
    const int MinY = -5;
    const int MinZ = 0;

    const int MaxX = 5;
    const int MaxY = 5;
    const int MaxZ = 5;

    int segmentNumber = 0;
    public double totalDist = 0;
    double time = 0;
    const double DT = 0.001;
    public double distOnSeg = 0;

    double u = 0f;

    int SegLooper(int segment)
    {
        switch (segment)
        {
            case -1:
                return 7;
            case -2:
                return 6;
            case 8:
                return 0;
            default:
                return segment;
        }
    }

    /* Returns a point on a cubic Catmull-Rom/Blended Parabolas curve
	 * u is a scalar value from 0 to 1
	 * segment_number indicates which 4 points to use for interpolation
	 */
    Vector3 PointOnCatmullRom(double u)
    {
        float t = .5f;
        float uf = (float)u;

        //determine p values
        Vector3 p0 = controlPoints[SegLooper(this.segmentNumber)];
        Vector3 p1 = controlPoints[SegLooper(this.segmentNumber + 1)];
        Vector3 p2 = controlPoints[SegLooper(this.segmentNumber - 1)];
        Vector3 p3 = controlPoints[SegLooper(this.segmentNumber - 2)];

        //determine coeffients
        Vector3 c0 = p2;
        Vector3 c1 = t * p0 + -t * p3;
        Vector3 c2 = (3 - 2 * t) * p0 + -t * p1 + (t - 3) * p2 + 2 * t * p3;
        Vector3 c3 = (t - 2) * p0 + t * p1 + (2 - t) * p2 + -t * p3;

        Vector3 point = c0 + c1 * uf + c2 * uf * uf + c3 * uf * uf * uf;

        return point;
    }

    void GenerateControlPointGeometry()
    {
        for (int i = 0; i < NumberOfPoints; i++)
        {
            GameObject tempcube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            tempcube.transform.localScale -= new Vector3(0.8f, 0.8f, 0.8f);
            tempcube.transform.position = controlPoints[i];
        }
    }

    // Use this for initialization
    void Start()
    {
        controlPoints = new Vector3[NumberOfPoints];
        normSegLens = new double[NumberOfPoints];
        cumSegLens = new double[NumberOfPoints];

        // set points randomly...
        controlPoints[0] = new Vector3(0, 0, 0);
        for (int i = 1; i < NumberOfPoints; i++)
        {
            controlPoints[i] = new Vector3(Random.Range(MinX, MaxX), Random.Range(MinY, MaxY), Random.Range(MinZ, MaxZ));
        }

        Player = GameObject.CreatePrimitive(PrimitiveType.Cube);
        Player.transform.localScale -= new Vector3(0.8f, 0.8f, 0.8f);
        Player.transform.position = controlPoints[0];

        GenerateControlPointGeometry();
        CalculateNormalizedArcLengths();
    }

    void CalculateNormalizedArcLengths()
    {
        double t = 0; //time for one segment
        double totalLen = 0f; //total length
        Vector3 lastPoint = new Vector3(0, 0, 0);
        double curSegLen = 0; //current segment length

        for (int i = 0; i < normSegLens.Length; i++)
        {
            bool completed = false;
            while (!completed)
            {
                t += DT;
                if (t >= 1)
                {
                    completed = true;
                    normSegLens[i] = curSegLen; //normal segment length of i is total current segment length
                    curSegLen = 0; //reset current segment length
                    t = 0; //reset time
                }
                else
                {
                    Vector3 nextPoint = PointOnCatmullRom(t);
                    totalLen += Vector3.Distance(lastPoint, nextPoint);
                    curSegLen += Vector3.Distance(lastPoint, nextPoint);
                    lastPoint = nextPoint;
                }

            }
        }
        double sum = 0;
        for (int i = 0; i < normSegLens.Length; i++)
        {
            normSegLens[i] = normSegLens[i] / totalLen;

        }
        for (int i = 0; i < cumSegLens.Length; i++)
        {
           cumSegLens[i] = sum;
            sum += normSegLens[i]; 
        }

    }
    double EaseInAndOut(double time)
    {
        double dist = ((double)Mathf.Sin(((float)time - 0.5f) * Mathf.PI) + 1.0f) / 2.0f;
        return dist;
    }

    // Update is called once per frame
    void Update()
    {
        double distanceInc = 0;
        distanceInc = EaseInAndOut(time); //Use ease function
        time += DT;
        totalDist = distanceInc;
        distOnSeg = totalDist - cumSegLens[segmentNumber];
        u = distOnSeg / normSegLens[segmentNumber]; //Translate the s to u

        if (u >= 1 || time >=1)
        { 
            segmentNumber++;
            if (segmentNumber == NumberOfPoints)
            {
                u = 0;
                time = 0;
                segmentNumber = 0;
                distOnSeg = 0;
                totalDist = 0;
            }
            else
            {
                distOnSeg = totalDist - cumSegLens[segmentNumber];
                u = distOnSeg / normSegLens[segmentNumber];
            }
        }
        Vector3 temp = PointOnCatmullRom(u);
        Vector3 past = position;
        Vector3 velocity = temp - past;
        Vector3 zero = Vector3.zero;
        if (velocity != zero)
        {
            Player.transform.forward = velocity; //Set the Player's forward.
        }
        velocityMag = velocity.magnitude;
        position = temp;
        Player.transform.position = temp;
    }
}
