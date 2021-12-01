using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    
    // Start is called before the first frame update
    public float mSpeed = 5f;    //speed of movement
    public float gravity = 1f;
    public Vector3 playerPos = Vector3.zero;
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        playerPos = this.transform.position;
        Shader.SetGlobalVector("_PlayerPos", playerPos);
        Movement();
        Applygravity();
    }
    private void Movement()
    {
        //move forward
        if (Input.GetKey(KeyCode.W))
        {
            transform.Translate(transform.forward * mSpeed * Time.deltaTime);
        }
        //move backward
        if (Input.GetKey(KeyCode.S))
        {
            transform.Translate(-transform.forward * mSpeed * Time.deltaTime);
        }
        //move left
        if (Input.GetKey(KeyCode.A))
        {
            transform.Translate(-transform.right * mSpeed * Time.deltaTime);
        }
        //move right
        if (Input.GetKey(KeyCode.D))
        {
            transform.Translate(transform.right * mSpeed * Time.deltaTime);
        }
        //move up
        if (Input.GetKey(KeyCode.Space))
        {
            transform.Translate(transform.up * 1.5f * mSpeed * Time.deltaTime);
        }
    }
    private void Applygravity()
    {
        if (Mathf.Abs(this.transform.position.y-2f) >= 0.01f)
        {
            transform.Translate(-transform.up * gravity * Time.deltaTime);
        }
    }

}
