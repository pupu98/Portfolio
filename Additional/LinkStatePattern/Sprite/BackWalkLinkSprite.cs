using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;

namespace LegendOfZelda.Scripts.Links.Sprite
{
    class BackWalkLinkSprite: BasicLinkSprite
    {    
        public BackWalkLinkSprite(Texture2D texture, Vector2 Position, bool damageState)
        {
            Rows = 1;
            Columns = 2;
            CurrentFrame = 0;
            TotalFrames = Rows * Columns;
            Texture = texture;
            Pos = Position;
            checkDamageState = damageState;
            Timer = 0;
        }
        public override void Update()
        {
            Timer++;
            Pos = new Vector2(Pos.X, Pos.Y - linkMoveSpeed);
            if (Timer == 10)
            {
                CurrentFrame = (CurrentFrame + 1) % TotalFrames;
                Timer = 0;
            }
        }
    }
}

