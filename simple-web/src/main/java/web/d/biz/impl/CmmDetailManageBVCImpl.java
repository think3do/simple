package web.d.biz.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import web.d.biz.CmmDetailManageBVC;
import web.d.dao.CmmDetailManageDAO;
import web.d.dvo.CmmDVO;
import web.d.svo.CmmSVO;
import web.z.util.WebUtil;

@Service("CmmDetailManageBVC")
public class CmmDetailManageBVCImpl  extends EgovAbstractServiceImpl implements CmmDetailManageBVC {

    @Resource(name = "CmmDetailManageDAO")
    private CmmDetailManageDAO cmmDetailManageDAO;

	/**
	 * 정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void insert(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cmmDetailManageDAO.insert(dvo);
	}

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
	@Override
	public List<CmmDVO> list(CmmSVO svo) throws Exception {

        CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);
		
		return cmmDetailManageDAO.selectList(dvo);
	};
	
	/**
     * 상세 조회 한다.
     *
     */
    public CmmDVO detail(CmmSVO svo) throws Exception{

        CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);
		
		return cmmDetailManageDAO.detail(dvo);
    }
    
    /**
	 * 정보를 수정 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void update(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cmmDetailManageDAO.update(dvo);
	}


	/**
	 * 정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void delete(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 삭제
		cmmDetailManageDAO.delete(dvo);
	}
	

	/**
	 * 정보를 모두 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void deleteAll(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 삭제
		cmmDetailManageDAO.deleteAll(dvo);
	}
}
