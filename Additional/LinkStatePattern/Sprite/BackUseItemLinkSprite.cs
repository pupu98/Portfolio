using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;

namespace LegendOfZelda.Scripts.Links.Sprite
{
    class BackUseItemLinkSprite: BasicLinkSprite
    {    
        public BackUseItemLinkSprite(Texture2D texture, Vector2 Position, bool damageState)
        {
            Rows = 1;
            Columns = 1;
            CurrentFrame = 0;
            TotalFrames = Rows * Columns;
            Texture = texture;
            Pos = Position;
            checkDamageState = damageState;
        }
        public override void Update()
        {
            CurrentFrame = CurrentFrame;
        }
    }
}

