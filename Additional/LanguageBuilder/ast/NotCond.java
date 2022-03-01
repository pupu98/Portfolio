package ast;
import java.util.HashMap;

public class NotCond extends Cond {

    final Cond cond;

    public NotCond(Cond cond, Location loc)  {
        super(loc);
        this.cond = cond;
    }

    @Override
    Object eval(HashMap<String,Object> env) {
        return (!(Boolean)cond.eval(env)); 
    }
}



