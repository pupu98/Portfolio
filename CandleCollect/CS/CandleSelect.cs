using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CandleSelect : MonoBehaviour
{
    public GameObject[] candles;
    IList<Fire> Fires = new List<Fire>();
    public Material material;
    public float range = 20f;
    public float cSpeed = 10f;
    public float deltaT = 0.001f;
    GameObject tempPlayer;
    public bool[] triggers;
    public bool[] time;
    public int score = 0;

    // Start is called before the first frame update
    void Start()
    {
        candles = GameObject.FindGameObjectsWithTag("candle") ;
        int number = candles.Length;
        triggers = new bool[number];
        time = new bool[number];
        createFires();
    }

    // Update is called once per frame
    void Update()
    {
        tempPlayer = GameObject.FindGameObjectWithTag("Player");
        for (int i = 0; i < Fires.Count; i++)
        {
            Vector3 positionPlayer = tempPlayer.transform.position;
            
            if (Fires[i].name.Substring(0,5) != "empty")
            {
                Vector3 positionFire = Fires[i].GetComponent<Fire>().transform.position;
                Debug.Log(positionFire);
                Vector3 distance = positionFire - positionPlayer;
                Debug.Log(distance);
                Debug.Log(range);
                if (triggers[i] == true)
               {
                   fly(i);
                }
               else if (distance.magnitude <= range)
                {
                    triggers[i] = true;
                    fly(i);
                    Debug.Log(triggers[i]);
                }
            }
            
        }
    }
    void createFires()
    {
        for (int i=0;i<candles.Length;i++)  
        {
            Vector3 temp = Vector3.zero;
            triggers[i] = false;
            time[i] = false;
            GameObject aSphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            aSphere.transform.parent = candles[i].transform;
            aSphere.name = "fire" + i.ToString();
            temp = candles[i].transform.position;
            temp.y = 1.5f * candles[i].transform.position.y + 1.5f;
            aSphere.transform.position = temp; 
            aSphere.transform.localScale = new Vector3(0.4f,0.4f,0.4f);
            aSphere.transform.GetComponent<Collider>().enabled = false;

            Fire f = aSphere.AddComponent<Fire>();
            f.fire = aSphere;

            Fires.Add(f);
            
        }

    }
    void createFire(int i)
    {
        GameObject empty = new GameObject();
        empty.transform.parent = candles[i].transform;
        empty.name = "empty" + i.ToString();

        Fire f = empty.AddComponent<Fire>();
        f.fire = empty;
        Fires[i] = f;

        triggers[i] = false;
        time[i] = false;
    }

    void deleteGameObjects(int number)
    {
        GameObject myFire = Fires[number].fire;
        Destroy(myFire);
        AudioSource audioData = GameObject.Find("fireS").GetComponent<AudioSource>();
        audioData.Play(0);
    }

    void fly(int i)
    {
        Vector3 positionFire = Fires[i].GetComponent<Fire>().transform.position;
        Vector3 positionPlayer = tempPlayer.transform.position;
        Vector3 direction = positionPlayer - positionFire;
        positionFire += cSpeed * direction*deltaT;
        Fires[i].GetComponent<Fire>().transform.position = positionFire;
        if((positionFire - positionPlayer).magnitude < 0.8f)
        {
            deleteGameObjects(i);
            score++;
            createFire(i);
        }
    }
}

