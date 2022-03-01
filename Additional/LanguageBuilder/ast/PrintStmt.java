package ast;
import java.util.HashMap;

public class PrintStmt extends Stmt{

    final Expr expr;

    public PrintStmt(Expr expr, Location loc){
        super(loc);
        this.expr = expr;
    }

    @Override
    Object exec(HashMap<String,Object> env) {
        System.out.println(expr.eval(env));
        return null;
    }
}

