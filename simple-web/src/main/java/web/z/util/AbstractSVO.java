package web.z.util;

public abstract class AbstractSVO {

	private String screenId     = "";
	private String actionClCd   = "";
	
	public String getScreenId() {
		return screenId;
	}

	public void setScreenId(String screenId) {
		this.screenId = screenId;
	}

	public String getActionClCd() {
		return actionClCd;
	}

	public void setActionClCd(String actionClCd) {
		this.actionClCd = actionClCd;
	}
	
}
