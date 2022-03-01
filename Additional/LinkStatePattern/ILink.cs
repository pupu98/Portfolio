using LegendOfZelda.Scripts.Links.State;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;
using static LegendOfZelda.Scripts.Items.WeaponManager;

namespace LegendOfZelda.Scripts.Links
{
    public interface ILink
    {
        ILinkState State { get; set; }
        public void ToIdle();
        public void MoveUp();
        public void MoveDown();
        public void MoveRight();
        public void MoveLeft();
        public void UseItem();
        public void Attack();
        void Update();
        void Draw(SpriteBatch spriteBatch);
    }
}
