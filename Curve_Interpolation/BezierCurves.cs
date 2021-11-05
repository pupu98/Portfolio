using UnityEngine;
using System.Collections;

public class BezierCurves : MonoBehaviour
{
    const int NumberOfPoints = 9;
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
            case 9:
                return 0;
            default:
                return segment;
        }
    }

    /* Returns a point on a Bezier curve
	 * u is a scalar value from 0 to 1
	 * segment_number indicates which 4 points to use for interpolation
	 */
    Vector3 DeCasteljausAlgorithm(double u)
    {
        float uf = (float)u;

        //determine p values
        Vector3 p0 = controlPoints[this.segmentNumber];
        Vector3 p1 = controlPoints[SegLooper(this.segmentNumber + 1)];
        Vector3 p2 = controlPoints[SegLooper(this.segmentNumber + 2)];
        Vector3 p3 = controlPoints[SegLooper(this.segmentNumber + 3)];

        //determine coeffients
        Vector3 q0 = Vector3.Lerp(p0, p1, uf);
        Vector3 q1 = Vector3.Lerp(p1, p2, uf); 
        Vector3 q2 = Vector3.Lerp(p2, p3, uf);

        Vector3 r0 = Vector3.Lerp(q0, q1, uf);
        Vector3 r1 = Vector3.Lerp(q1, q2, uf);

        Vector3 point = Vector3.Lerp(r0, r1, uf);

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
                    Vector3 nextPoint = DeCasteljausAlgorithm(t);
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
        u = distOnSeg / (normSegLens[segmentNumber]+ normSegLens[segmentNumber+1]+normSegLens[SegLooper(segmentNumber + 2)]); //Translate the s to u

        if (u >= 1 || time >= 1)
        {
            segmentNumber+=3;
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
                u = distOnSeg / (normSegLens[segmentNumber] + normSegLens[segmentNumber + 1] + normSegLens[SegLooper(segmentNumber + 2)]);
            }
        }
        Vector3 temp = DeCasteljausAlgorithm(u);
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
