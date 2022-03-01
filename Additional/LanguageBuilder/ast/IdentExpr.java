package ast;
import java.util.HashMap;

public class IdentExpr extends Expr {

    final Object ident;

    public IdentExpr(String ident, Location loc) {
        super(loc);
        this.ident = ident;
    }

    @Override
    public String toString() {
        return ident.toString();
    }

    @Override
    Object eval(HashMap<String,Object> env) {
        return (long)env.get(ident);
    }
}
