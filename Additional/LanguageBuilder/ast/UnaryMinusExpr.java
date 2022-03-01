package ast;
import java.util.HashMap;

public class UnaryMinusExpr extends Expr {

    final Expr value;

    public UnaryMinusExpr(Expr value, Location loc) {
        super(loc);
        this.value = value;
    }

    @Override
    public String toString() {
        return "-"+" "+value;
    }

    @Override
    Object eval(HashMap<String,Object> env) {
        return (long)0 - (long)value.eval(env);
    }
}
