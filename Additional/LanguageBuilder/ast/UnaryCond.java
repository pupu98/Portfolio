package ast;
import java.util.HashMap;

public class UnaryCond extends Cond {
    public static final int AND = 1;
    public static final int OR = 2;

    final Cond cond1;
    final int operator;
    final Cond cond2;

    public UnaryCond(Cond cond1, int operator, Cond cond2, Location loc)  {
        super(loc);
        this.cond1 = cond1;
        this.operator = operator;
        this.cond2 = cond2;
    }

    @Override
    Object eval(HashMap<String,Object> env) {
        switch (operator) {
            case AND:  return ((Boolean)cond1.eval(env) && (Boolean)cond2.eval(env)); 
            case OR:  return ((Boolean)cond1.eval(env) || (Boolean)cond2.eval(env)); 
        }
        throw new RuntimeException("Unexpected in UnaryCond.eval");
    }
}



