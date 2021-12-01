using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Fire : MonoBehaviour
{
    public GameObject fire;
    // Start is called before the first frame update
    void Start()
    {
        if (fire.name.Substring(0, 5) != "empty")
        {
            var render = fire.GetComponent<Renderer>();
            Vector4 color = new Vector4(1f, 0.95f, 0.01f, 0.5f);
            render.material.SetColor("_Color", color);
        }
            
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
