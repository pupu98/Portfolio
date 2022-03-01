package ast;
import java.util.HashMap;

public class ReturnStmt extends Stmt {

    final Expr expr;

    public ReturnStmt(Expr expr, Location loc) {
        super(loc);
        this.expr = expr;
    }

    public String toString() {
        return "return"+" "+ expr +";";
    }

    @Override
    Object exec(HashMap<String,Object> env) {
        //System.out.println(expr.toString());
        return (long)expr.eval(env);
    }
}

