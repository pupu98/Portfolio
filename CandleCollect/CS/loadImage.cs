using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class loadImage : MonoBehaviour
{
    public int score = 0;
    // Start is called before the first frame update
    void Start()
    {
        score = GameObject.Find("CanCollect").GetComponent<CandleSelect>().score;
        GameObject.Find("in1").GetComponent<CanvasGroup>().alpha = 0;
        GameObject.Find("in2").GetComponent<CanvasGroup>().alpha = 0;
        GameObject.Find("in3").GetComponent<CanvasGroup>().alpha = 0;
    }

    // Update is called once per frame
    void Update()
    {
        score = GameObject.Find("CanCollect").GetComponent<CandleSelect>().score;
        if(score%3 == 0&&score!=0)
        {
            GameObject.Find("in1").GetComponent<CanvasGroup>().alpha = 1;
            GameObject.Find("in2").GetComponent<CanvasGroup>().alpha = 1;
            GameObject.Find("in3").GetComponent<CanvasGroup>().alpha = 1;
        }
        else if(score%3 == 1)
        {
            GameObject.Find("in1").GetComponent<CanvasGroup>().alpha = 0;
            GameObject.Find("in2").GetComponent<CanvasGroup>().alpha = 0;
            GameObject.Find("in3").GetComponent<CanvasGroup>().alpha = 1;
        }
        else if (score % 3 == 2)
        {
            GameObject.Find("in1").GetComponent<CanvasGroup>().alpha = 0;
            GameObject.Find("in2").GetComponent<CanvasGroup>().alpha = 1;
            GameObject.Find("in3").GetComponent<CanvasGroup>().alpha = 1;
        }
    }
}
