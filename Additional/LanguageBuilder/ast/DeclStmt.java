package ast;
import java.util.HashMap;

public class DeclStmt extends Stmt {
    
    final VarDecl varDecl;
    final Expr expr;

    public DeclStmt(VarDecl varDecl, Expr expr, Location loc) {
        super(loc);
        this.varDecl = varDecl;
        this.expr = expr;
    }

    @Override
    //Object eval(HashMap<String,Object> env);
    public Object exec(HashMap<String,Object> env){
        env.put((String)varDecl.eval(env), expr.eval(env));
        return null;
    }
}

