package ast;

import java.io.PrintStream;
import java.util.HashMap;

public class Program extends ASTNode {

    final String arg;
    final StmtList stmtList;
    

    public Program(String arg, StmtList stmtList, Location loc) {
        super(loc);
        this.arg = arg;
        this.stmtList = stmtList;
    }

    public void println(PrintStream ps) {
        ps.println(stmtList);
    }

    public Object exec(long argument){
        HashMap<String, Object> env = new HashMap<>();
        env.put(arg, argument);
        return stmtList.exec(env);
    }
}
