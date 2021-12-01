using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.UI;

public class Score : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        this.GetComponent<UnityEngine.UI.Text>().text = "0";
    }

    // Update is called once per frame
    void Update()
    {
        int score = GameObject.Find("CanCollect").GetComponent<CandleSelect>().score;
        this.GetComponent<UnityEngine.UI.Text>().text = "" + score / 3;
    }
}
