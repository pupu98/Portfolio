package ast;
import java.util.HashMap;

public class ExprCond extends Cond {
    public static final int LARGER = 1;
    public static final int LESS = 2;
    public static final int LAREQ = 3;
    public static final int LESEQ = 4;
    public static final int EQ = 5;
    public static final int NOTEQ = 6;

    final Expr expr1;
    final int operator;
    final Expr expr2;

    public ExprCond(Expr expr1, int operator, Expr expr2, Location loc)  {
        super(loc);
        this.expr1 = expr1;
        this.operator = operator;
        this.expr2 = expr2;
    }

    @Override
    Object eval(HashMap<String,Object> env) {
        switch (operator) {
            case LARGER:  return ((long)expr1.eval(env) > (long)expr2.eval(env)); 
            case LESS:  return ((long)expr1.eval(env) < (long)expr2.eval(env)); 
            case LAREQ:  return ((long)expr1.eval(env) >= (long)expr2.eval(env)); 
            case LESEQ:  return ((long)expr1.eval(env) <= (long)expr2.eval(env)); 
            case EQ:  return ((long)expr1.eval(env) == (long)expr2.eval(env)); 
            case NOTEQ:  return ((long)expr1.eval(env) != (long)expr2.eval(env)); 
        }
        throw new RuntimeException("Unexpected in ExprCond.eval");
    }
}



