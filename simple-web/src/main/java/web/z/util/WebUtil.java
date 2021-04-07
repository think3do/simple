package web.z.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.let.utl.fcc.service.EgovDateUtil;
import egovframework.let.utl.fcc.service.EgovStringUtil;


public class WebUtil {
	
	
	// 권한 위반 화면
	public static String AUTH_ERROR_UI = "";
	
	/**
	 * 마스터 권한체크
	 * @param user
	 * @return
	 */
	public static boolean checkMasterAuthority(LoginVO user) {
	
		
		return true;
	}
	
	/**
	 * 고객의 사용자번호 채번
	 * @param sn
	 * @return
	 */
	public static String makeId(String sn) {
		
		String today = EgovDateUtil.getToday();
		
		return today.concat(StringUtils.leftPad(sn, 10, '0'));
	}

	public static void main(String[] args) {
		
		System.out.println(makeId("1"));
		
	}

	/**
	 * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서14자리의TIMESTAMP값을 구하는 기능
	 *
	 * @param
	 * @return Timestamp 값
	 * @exception MyException
	 * @see
	 */
	public static String getTimeStamp() {

		String rtnStr = null;

		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmss";

		SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
		Timestamp ts = new Timestamp(System.currentTimeMillis());

		rtnStr = sdfCurrent.format(ts.getTime());

		return rtnStr;
	}

	/**
	 * dao 에서 사용될 값  return
	 * @return
	 */
	public static void getEtcInfo(AbstractDVO dvo, String screenId){
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		
		String userId = "";
		
		if(user == null || EgovStringUtil.isEmpty(user.getId())) {
			userId = "NO SESSION";
		} else {
			userId = user.getId();
		}
		
		if(screenId == null || EgovStringUtil.isEmpty(screenId)) {
			screenId = "NO SCREENID";
		}
		
		dvo.setFrsRgtDtm(getTimeStamp());
		dvo.setFrsRgtPgmId(screenId);
		dvo.setFrsRgtUerId(userId);
		
		dvo.setLstAltDtm(dvo.getFrsRgtDtm());
		dvo.setLstAltPgmId(screenId);
		dvo.setLstAltUserId(userId);
	}
	
	

    /**
     * XSS 방지 처리.
     *
     * @param data
     * @return
     */
    public static String unscript(String data) {
        
    	if (data == null || data.trim().equals("")) {
            return "";
        }

        String ret = data;

        ret = ret.replaceAll("<(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;script");
        ret = ret.replaceAll("</(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;/script");

        ret = ret.replaceAll("<(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;object");
        ret = ret.replaceAll("</(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;/object");

        ret = ret.replaceAll("<(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;applet");
        ret = ret.replaceAll("</(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;/applet");

        ret = ret.replaceAll("<(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");
        ret = ret.replaceAll("</(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");

        ret = ret.replaceAll("<(F|f)(O|o)(R|r)(M|m)", "&lt;form");
        ret = ret.replaceAll("</(F|f)(O|o)(R|r)(M|m)", "&lt;form");

        return ret;
    }
}
