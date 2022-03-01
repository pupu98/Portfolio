using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;

namespace LegendOfZelda.Scripts.Links.Sprite
{
    public interface ISprite
    {
        Vector2 Position { get; set; }
        void Update();
        void Draw(SpriteBatch spriteBatch);
    }
}
