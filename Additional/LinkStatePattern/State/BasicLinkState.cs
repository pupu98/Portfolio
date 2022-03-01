using LegendOfZelda.Scripts.Items;
using LegendOfZelda.Scripts.Links.Sprite;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Text;

namespace LegendOfZelda.Scripts.Links.State
{
    class BasicLinkState : ILinkState
    {
        public virtual ILink Link { get; set; }
        public virtual Vector2 Position { get; set; }
        public virtual ISprite Sprite { get; set; }

        public bool isDamaged;
        /*
            direction = 0 ->Front
            direction = 1 ->Back
            direction = 2 ->Left
            direction = 3 ->Right

            only move could change direction
            use static to let child change parent data.
        */

        protected static int direction = 3;
        public int Direction { get { return direction; } }
        protected int timer = 20;




        public virtual void Update()
        {
            Sprite.Update();
            Position = Sprite.Position;

        }
        
        public virtual void ToDamaged()
        {
            if (!isDamaged)
            {
                isDamaged = true;
            }
            else
            {
                isDamaged = false;
            }

            
        }
        public virtual void ToIdle()
        {
            if (direction == 0)
            {
                Link.State = new FrontIdleLinkState(Link, Position, isDamaged);
            }
            else if (direction == 1)
            {
                Link.State = new BackIdleLinkState(Link, Position, isDamaged);
            }
            else if (direction == 2)
            {
                Link.State = new LeftIdleLinkState(Link, Position, isDamaged);
            }
            else if (direction == 3)
            {
                Link.State = new RightIdleLinkState(Link, Position, isDamaged);
            }

        }
        public virtual void MoveUp()
        {
            Link.State = new BackWalkLinkState(Link, Position, isDamaged);
        }

        public virtual void MoveDown()
        {
            Link.State = new FrontWalkLinkState(Link, Position, isDamaged);
        }
        public virtual void MoveLeft()
        {
            Link.State = new LeftWalkLinkState(Link, Position, isDamaged);
            
        }
        public virtual void MoveRight()
        {
            Link.State = new RightWalkLinkState(Link, Position, isDamaged);
        }

        public virtual void UseItem()
        {
                if (direction == 0)
                {
                    Link.State = new FrontUseItemLinkState(Link, Position, isDamaged);
                }
                else if (direction == 1)
                {
                    Link.State = new BackUseItemLinkState(Link, Position, isDamaged);
                }
                else if (direction == 2)
                {
                    Link.State = new LeftUseItemLinkState(Link, Position, isDamaged);
                }
                else if (direction == 3)
                {
                    Link.State = new RightUseItemLinkState(Link, Position, isDamaged);
                }
        }

        public virtual void Attack()
        {
            // Must apply the other 3 directions
            if (direction == 0)
            {
                Link.State = new FrontAttackLinkState(Link, Position, isDamaged);
            }
            else if (direction == 1)
            {
                Link.State = new BackAttackLinkState(Link, Position, isDamaged);
            }
            else if (direction == 2)
            {
                Link.State = new LeftAttackLinkState(Link, Position, isDamaged);
            }
            else if (direction == 3)
            {
                Link.State = new RightAttackLinkState(Link, Position, isDamaged);
            }
        }
        public virtual void Draw(SpriteBatch spriteBatch)
        {
            this.Sprite.Draw(spriteBatch);
        }
    }
}
