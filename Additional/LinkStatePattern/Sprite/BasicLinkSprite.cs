using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;

namespace LegendOfZelda.Scripts.Links.Sprite
{
    abstract class BasicLinkSprite: ISprite
    {
        protected virtual Vector2 Pos { get; set; }
        public virtual Vector2 Position
        {
            get { return new Vector2(Pos.X, Pos.Y); }
            set { Pos = value; }
        }
        public virtual Texture2D Texture { get; set; }

        protected virtual int Rows { get; set; }
        protected virtual int Columns { get; set; }
        protected virtual int CurrentFrame { get; set; }
        protected virtual int TotalFrames { get; set; }

        protected virtual int Timer { get; set; }

        protected int linkMoveSpeed = 2;

        //set to false by default, change to true when "e" key is pressed. 
        public bool checkDamageState = true; //{ get; set; }
        public Color SpriteColor { get; set; }

        public virtual void Update()
        {

        }
        public virtual void Draw(SpriteBatch spriteBatch)
        {
            int width = Texture.Width / Columns;
            int height = Texture.Height / Rows;
            int row = CurrentFrame / Columns;
            int column = CurrentFrame % Columns;

            if (checkDamageState == true)
            {
                SpriteColor = Color.Red;
            }
            else
            {
                SpriteColor = Color.White;
            }


            Rectangle sourceRectangle = new Rectangle(width * column, height * row, width, height);
            Rectangle destinationRectangle = new Rectangle((int)Pos.X, (int)Pos.Y, width, height);

            spriteBatch.Draw(Texture, destinationRectangle, sourceRectangle, SpriteColor);

        }
    }
}

