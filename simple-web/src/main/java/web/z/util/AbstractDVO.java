package web.z.util;

public abstract class AbstractDVO {

	private String frsRgtDtm    = "";
	private String frsRgtUerId  = "";
	private String frsRgtPgmId  = "";
	private String lstAltDtm    = "";
	private String lstAltUserId = "";
	private String lstAltPgmId  = "";
	private String actionClCd   = "";
	
	
	public String getActionClCd() {
		return actionClCd;
	}
	public void setActionClCd(String actionClCd) {
		this.actionClCd = actionClCd;
	}
	public String getFrsRgtDtm() {
		return frsRgtDtm;
	}
	public void setFrsRgtDtm(String frsRgtDtm) {
		this.frsRgtDtm = frsRgtDtm;
	}
	public String getFrsRgtUerId() {
		return frsRgtUerId;
	}
	public void setFrsRgtUerId(String frsRgtUerId) {
		this.frsRgtUerId = frsRgtUerId;
	}
	public String getFrsRgtPgmId() {
		return frsRgtPgmId;
	}
	public void setFrsRgtPgmId(String frsRgtPgmId) {
		this.frsRgtPgmId = frsRgtPgmId;
	}
	public String getLstAltDtm() {
		return lstAltDtm;
	}
	public void setLstAltDtm(String lstAltDtm) {
		this.lstAltDtm = lstAltDtm;
	}
	public String getLstAltUserId() {
		return lstAltUserId;
	}
	public void setLstAltUserId(String lstAltUserId) {
		this.lstAltUserId = lstAltUserId;
	}
	public String getLstAltPgmId() {
		return lstAltPgmId;
	}
	public void setLstAltPgmId(String lstAltPgmId) {
		this.lstAltPgmId = lstAltPgmId;
	}
	
	
}
