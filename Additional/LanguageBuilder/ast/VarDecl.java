package ast;
import java.util.HashMap;

public class VarDecl extends ASTNode {
    
    final String arg;

    public VarDecl(String arg, Location loc) {
        super(loc);
        this.arg = arg;
    }

    //Object eval(HashMap<String,Object> env);
    public Object eval(HashMap<String,Object> env){
        return arg;
    }
}

