using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SphereYellow : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        var render = this.GetComponent<Renderer>();
        render.material.SetColor("_Color", Color.yellow);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
